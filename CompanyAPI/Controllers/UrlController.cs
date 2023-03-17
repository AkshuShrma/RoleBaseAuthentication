using CompanyAPI.Data;
using CompanyAPI.Models;
using CompanyAPI.Models.DTO;
using CompanyAPI.Repository;
using CompanyAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace CompanyAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UrlController : ControllerBase
    {
        private readonly ILeaveRepo _leaveRepo;
        private readonly IAuthentication _userService;
        private readonly ApplicationDbContext _context;
        public UrlController(ApplicationDbContext context, IAuthentication userService, ILeaveRepo leaveRepo)
        {
            _context = context;
            _userService = userService;
            _leaveRepo = leaveRepo;
        }
        [HttpPut]
        [Route("ApproveOrReject")]
        public async Task<IActionResult> setApprovRejects(int id, [FromBody] LeaveDTO leave)
        {
            if (leave == null) return BadRequest();
            if (_leaveRepo.LeaveExists(leave.EmployeeId))
            {
                ModelState.AddModelError("", $"Leave in use!!{leave.EmployeeId}");
                return NotFound("Already Leave Applied ");
            }
            var findLeave = _context.Leaves.FirstOrDefault(u => u.EmployeeId == leave.EmployeeId);
            if (findLeave == null) return BadRequest();
            findLeave.Status = (LeaveType.LeaveStatus)leave.Status;
            _context.Leaves.Update(findLeave);
            _context.SaveChanges();
            return Ok(new { Data = "Leave Status Updated" });
        }
    }
}
