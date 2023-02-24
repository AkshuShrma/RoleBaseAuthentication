using CompanyAPI.Models;
using CompanyAPI.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CompanyAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeRepo _employee;
        public EmployeeController(IEmployeeRepo employee)
        {
            _employee = employee;
        }
        [HttpGet]
        public async Task<IEnumerable<Employee>> Get()
        {
            var employees = await _employee.GetEmployees();
            return employees;
        }
        [HttpGet("{id}")]
        public async Task<Employee> GetById(int id)
        {
            return await _employee.GetEmployeeById(id);
        }
        [HttpPost]
        public async Task Post([FromBody] Employee employee)
        {
            await _employee.AddEmployee(employee);
        }
        [HttpPut("{id}")]
        public async Task Update(int id, [FromBody] Employee employee)
        {
            await _employee.UpdateEmployee(id, employee);
        }
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await _employee.DeleteEmployee(id);
        }
    }
}
