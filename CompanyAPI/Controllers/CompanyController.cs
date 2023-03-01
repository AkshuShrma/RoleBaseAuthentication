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

namespace CompanyAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
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
        public async Task<IActionResult> Post([FromBody] Company company)
        {
            await _company.AddCompany(company);
            return Ok(company);
        }
        [HttpPut("{id}")]
        public async Task Update(int id, [FromBody] Company company)
        {
            await _company.UpdateCompany(id, company);
        }
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await _company.DeleteCompany(id);
        }
        [HttpGet]
        [Route("Employees")]
        public IActionResult Employee(int id)
        {
            var employees = _context.Employee.Where(e => e.CompanyId == id).ToList();
            if (employees == null) return NotFound("No Employee In This Company");
            return Ok(employees);
        }
        [HttpGet]
        [Route("Designations")]
        public IActionResult Designation(int id)
        {
            var designations = _context.Designations.Where(e => e.CompanyId == id);
            if (designations == null) return NotFound("No Designation In This Company");
            return Ok(designations);
        }
    }
}
