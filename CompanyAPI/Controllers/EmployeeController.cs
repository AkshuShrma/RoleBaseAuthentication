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
using System.Security.Claims;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace CompanyAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = SD.Role_Admin + "," + SD.Role_Company+","+SD.Role_Employee)]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeRepo _employee;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IAuthentication _userService;
        private readonly IMapper _mapper;
        private readonly ApplicationDbContext _context;
        public EmployeeController(IMapper mapper, IAuthentication userService, UserManager<ApplicationUser> userManager, IEmployeeRepo employee, ApplicationDbContext context)
        {
            _mapper = mapper;
            _userService = userService;
            _userManager = userManager;
            _employee = employee;
            _context = context;
        }
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            ClaimsIdentity? claimIdentity = User?.Identity as ClaimsIdentity;
            if (claimIdentity == null) { return BadRequest(); }
            var claim = claimIdentity.FindFirst(ClaimTypes.Name);
            if (claim == null) { return BadRequest(); }
            var getUserDetailed = await _userService.CheckUserInDb(claim.Value);
            if (getUserDetailed == null) { return BadRequest(); }

            if (getUserDetailed.Role == "Admin")
            {
                var emp = await _employee.GetEmployees();
                if (emp == null) return BadRequest("No Employee Found");
                return Ok(emp);
            }
            var specificEmp = new List<Employee>();
            var findEmp = _context.Employee.FirstOrDefault(u => u.ApplicationUserId == getUserDetailed.Id);
            if (findEmp == null) return BadRequest("No Employee Found");
            specificEmp.Add(findEmp);
            return Ok(specificEmp);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var emp = await _employee.GetEmployeeById(id);
            if (emp == null) return BadRequest("No Data Found in DB");
            return Ok(emp);
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] EmployeeDTO employee)
        {
            try
            {
                if (employee == null || !ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var employeeDetail = _mapper.Map<Employee>(employee);
                ApplicationUser user = new ApplicationUser()
                {
                    UserName = employee.UserName,
                    PasswordHash = "Admin@123",
                    Role = SD.Role_Employee
                };
                var registerCompany = await _userService.RegisterUser(user);
                employeeDetail.ApplicationUserId = user.Id;
                await _employee.AddEmployee(employeeDetail);
                return Ok(employeeDetail);
            }
            catch (Exception)
            {
                throw;
            }
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Employee employee)
        {
            await _employee.UpdateEmployee(id, employee);
            if (employee == null) return NotFound();
            return Ok(employee);
        }
        [Authorize(Roles =SD.Role_Admin+","+SD.Role_Company)]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var findEmployee = _context.Employee.FirstOrDefault(u => u.Id == id);
                if (findEmployee == null) return NotFound();
                await _employee.DeleteEmployee(id);
                var findInApplicationUser = await _userManager.FindByIdAsync(findEmployee.ApplicationUserId);
                if (findInApplicationUser == null) return BadRequest();
                // remove applicationuser data of employee 
                if (!_userManager.DeleteAsync(findInApplicationUser).Result.Succeeded)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError);
                }
                return Ok("User deleted succesfully");
            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }
}

