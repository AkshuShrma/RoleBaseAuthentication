using CompanyAPI.Data;
using CompanyAPI.Models;
using CompanyAPI.Repository;
using Microsoft.AspNetCore.Authorization;
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
        private readonly ApplicationDbContext _context;
        public CompanyController(ICompany company, ApplicationDbContext context)
        {
            _company = company;
            _context = context;
        }
        //[HttpGet]
        //public async Task<IActionResult> Get()
        //{
        //    var comp = await (from company in _context.Companies
        //                      select new
        //                      {
        //                          Id = company.Id,
        //                          Name = company.Name,
        //                      }).ToListAsync();
        //    return Ok(comp);
        //}
        //[HttpGet("{id}")]
        //public async Task<IActionResult> CompanyDetails(int id)
        //{
        //    var comp = await (_context.Companies.Include(x => x.Employees).Where(x => x.Id == id).FirstOrDefaultAsync());
        //    return Ok(comp);
        //}
        //[HttpPost]
        //public async Task<IActionResult> Post([FromBody] Company company)
        //{
        //    await _context.Companies.AddAsync(company);
        //    await _context.SaveChangesAsync();
        //    return StatusCode(StatusCodes.Status201Created);
        //}
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
        public async Task Post([FromBody] Company company)
        {
            await _company.AddCompany(company);
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
            var employees = _context.Employees.Where(e => e.CompanyId == id).ToList();
            if (employees == null) return NotFound("No Employee In This Company");
            return Ok(employees);
        }
    }
}
