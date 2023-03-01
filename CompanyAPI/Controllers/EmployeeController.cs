using AutoMapper;
using CompanyAPI.Data;
using CompanyAPI.Models;
using CompanyAPI.Models.DTO;
using CompanyAPI.Repository;
using CompanyAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CompanyAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeRepo _employee;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IAuthentication _userService;
        private readonly IMapper _mapper;
        public EmployeeController(IMapper mapper, IAuthentication userService, UserManager<ApplicationUser> userManager, IEmployeeRepo employee)
        {
            _mapper = mapper;
            _userService = userService;
            _userManager = userManager;
            _employee = employee;
        }
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
            return Ok(employee);
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

