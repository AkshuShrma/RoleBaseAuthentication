using CompanyAPI.Models;
using CompanyAPI.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace CompanyAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CompanyController : ControllerBase
    {
        private readonly ICompany _company;
        public CompanyController(ICompany company)
        {
            _company = company;
        }
        [HttpGet]
        public async Task<IEnumerable<Company>> Get()
        {
            var compnies = await _company.GetCompanies();
            return compnies;
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
    }
}
