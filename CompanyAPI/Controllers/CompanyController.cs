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

namespace CompanyAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize(Roles = SD.Role_Admin + "," + SD.Role_Company)]
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
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var compnies = await _company.GetCompanies();
            if (compnies == null) return BadRequest("No Company Found");
            return Ok(compnies);
        }
        [HttpGet("{id}")]
        public async Task<Company> GetById(int id)
        {
            return await _company.GetCompanyById(id);
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CompanyDTO company)
        {
            if (company == null || !ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var companyDetail = _mapper.Map<Company>(company);
            var passwordGen = "";
            ApplicationUser user = new ApplicationUser()
            {
                UserName = company.UserName,
                PasswordHash = _userService.GeneratePassword(),
                Role = SD.Role_Company
            };
            passwordGen = user.PasswordHash;
            var registerCompany = await _userService.RegisterUser(user);
            companyDetail.ApplicationUserId = user.Id;
            await _company.AddCompany(companyDetail);
            return Ok(company);
        }
        [HttpPut("{id}")]
        public async Task Update(int id, [FromBody] Company company)
        {
            await _company.UpdateCompany(id, company);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _company.DeleteCompany(id);
            return Ok("Data Deleted");
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
