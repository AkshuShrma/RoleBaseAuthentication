using CompanyAPI.Data;
using CompanyAPI.Models;
using CompanyAPI.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CompanyAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class EmployeeController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IEmployeeRepo _employee;
        public EmployeeController(IEmployeeRepo employee, ApplicationDbContext context)
        {
            _employee = employee;
            _context = context;
        }
        //[HttpGet]
        //public async Task<IActionResult> Get()
        //{
        //    var emp = await (from employee in _context.Employees
        //                      select new
        //                      {
        //                          Id = employee.Id,
        //                          Name = employee.Name,
        //                          Address = employee.Address,
        //                          AccountNumber = employee.Name,
        //                          NaPANCard = employee.Name,
        //                          PFAccountNumber = employee.Name,
        //                      }).ToListAsync();
        //    return Ok(emp);
        //}
        //[HttpGet("{id}")]
        //public async Task<IActionResult> EmpDetails(int id)
        //{
        //    var emp = await (_context.Employees.Where(x => x.Id == id).FirstOrDefaultAsync());
        //    return Ok(emp);
        //}
        //[HttpPost]
        //public async Task<IActionResult> Post([FromBody] Employee employee)
        //{
        //    await _context.Employees.AddAsync(employee);
        //    await _context.SaveChangesAsync();
        //    return StatusCode(StatusCodes.Status201Created);
        //}
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var employees = await _employee.GetEmployees();
            if (employees == null) return NotFound("You Have to Add Employees");
            return Ok(employees);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var emp = await _employee.GetEmployeeById(id);
            if (emp == null) return BadRequest("No Data Found in DB");
            return Ok(emp);
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Employee employee)
        {
             await _employee.AddEmployee(employee);
            if (employee == null) return BadRequest("Data Not Added");
            return StatusCode(StatusCodes.Status200OK);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Employee employee)
        {
            await _employee.UpdateEmployee(id, employee);
            if (employee == null) return BadRequest("Data Not Updated");
            return Ok();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _employee.DeleteEmployee(id);
            if (id == 0) return BadRequest("Data is not Deleted");
            return Ok();
        }
    }
}
