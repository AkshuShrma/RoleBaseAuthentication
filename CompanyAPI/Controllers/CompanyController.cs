using AutoMapper;
using CompanyAPI.Data;
using CompanyAPI.Models;
using CompanyAPI.Models.DTO;
using CompanyAPI.Repository;
using CompanyAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Security.Claims;

namespace CompanyAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = SD.Role_Admin + "," + SD.Role_Company)]
    public class CompanyController : ControllerBase
    {
        private readonly ICompany _company;
        private readonly IAuthentication _userService;
        private readonly IMapper _mapper;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ApplicationDbContext _context;
        public CompanyController(ApplicationDbContext context, UserManager<ApplicationUser> userManager, IAuthentication userService, IMapper mapper, ICompany company)
        {
            _context = context;
            _userManager = userManager;
            _userService = userService;
            _mapper = mapper;
            _company = company;
        }
        [Route("GetSpecificCompany")]
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            ClaimsIdentity? claimIdentity = User?.Identity as ClaimsIdentity;
            if (claimIdentity == null) { return BadRequest(); }
            var claim = claimIdentity.FindFirst(ClaimTypes.Name);
            if (claim == null) { return BadRequest(); }
            var getUserDetailed = await _userService.CheckUserInDb(claim.Value);
            if (getUserDetailed == null) { return BadRequest(); }

                if(getUserDetailed.Role == "Admin")
                {
                    var compnies = await _company.GetCompanies();
                    if (compnies == null) return BadRequest("No Company Found");
                    return Ok(compnies);
                }
            var specificCompany = new List<Company>();
                var findCompany = _context.Company.FirstOrDefault(u => u.ApplicationUserId == getUserDetailed.Id);
                if (findCompany == null) return BadRequest("No Company Found");
            specificCompany.Add(findCompany);
            return Ok(specificCompany);
        }
        [HttpGet("{id}")]
        public async Task<Company> GetById(int id)
        {
            return await _company.GetCompanyById(id);
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CompanyDTO company)
        {
            try
            {
                if (company == null || !ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var companyDetail = _mapper.Map<Company>(company);
                ApplicationUser user = new ApplicationUser()
                {
                    UserName = company.UserName,
                    PasswordHash = "Admin@123",
                    Role = SD.Role_Company
                };
                var registerCompany = await _userService.RegisterUser(user);
                companyDetail.ApplicationUserId = user.Id;
                await _company.AddCompany(companyDetail);
                return Ok(companyDetail);
            }
            catch (Exception)
            {
                throw;
            }
        }
        [HttpPut("{id}")]
        public async Task Update(int id, [FromBody] Company company)
        {
            await _company.UpdateCompany(id, company);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var company = _context.Company.FirstOrDefault(u => u.Id == id);
                if (company == null) return NotFound("Id not macth");
                var commpanyEmployee = _context.Employee.Where(u => u.CompanyId == company.Id);
                if (commpanyEmployee != null)
                {
                    _context.Employee.RemoveRange(commpanyEmployee);
                }
                var getEmpDesignation = _context.Designation.Where(u => u.CompanyId == company.Id);
                if (getEmpDesignation != null)
                {
                    _context.Designation.RemoveRange(getEmpDesignation);
                }
                await _company.DeleteCompany(id);
                var getASPNetUsers = await _userManager.FindByIdAsync(company.ApplicationUserId);
                if (getASPNetUsers == null) return BadRequest();
                // remove applicationuser all data related company employee or designaton... 
                if (!_userManager.DeleteAsync(getASPNetUsers).Result.Succeeded)
                {
                    return NotFound("Company not found");
                }
                return Ok(getASPNetUsers);
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        [HttpGet]
        [Route("Employees")]
        [AllowAnonymous]
        public IActionResult Employee(int id)
        {
            var employees = _context.Employee.Where(e => e.CompanyId == id).ToList();
            if (employees == null) return NotFound("No Employee In This Company");
            return Ok(employees);
        }
        [HttpGet]
        [Route("Designations")]
        [AllowAnonymous]
        public IActionResult Designations(int id)
        {
            var designations = _context.Designation.Where(e => e.CompanyId == id).ToList();
            if (designations == null) return NotFound("No Designation In This Company");
            return Ok(designations);
        }
        [HttpGet]
        [Route("Leaves")]
        [AllowAnonymous]
        public IActionResult Leaves(int id)
        {
            var leaves = _context.Leaves.Where(e => e.EmployeeId == id).ToList().Where(u => u.Status != (LeaveType.LeaveStatus)1).Where(u => u.Status != (LeaveType.LeaveStatus)3);
            if (leaves==null ) return NotFound();
            return Ok(leaves);
        }
    }
}
