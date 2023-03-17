using AutoMapper;
using CompanyAPI.Data;
using CompanyAPI.Models;
using CompanyAPI.Models.DTO;
using CompanyAPI.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace CompanyAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LeaveController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ILeaveRepo _leaveRepo;
        private readonly IMapper _mapper;
        public LeaveController(ApplicationDbContext context, ILeaveRepo leaveRepo, IMapper mapper)
        {
            _context = context;
            _leaveRepo = leaveRepo;
            _mapper = mapper;
        }
        [HttpGet]
        public IActionResult GetLeaves()
        {
            var leaveDtoList = _leaveRepo.GetLeaves().Select(_mapper.Map<LeaveDTO>)/*.Where(u=>u.Status!= (LeaveDTO.LeaveStatus)1)*/;
            return Ok(leaveDtoList);
        }
        [HttpGet("{leaveId:int}", Name = "GetLeave")]
        public IActionResult GetLeave(int leaveId)
        {
            var leave = _leaveRepo.GetLeave(leaveId);
            if (leave == null) return NotFound();
            var leaveDTO = _mapper.Map<LeaveDTO>(leave);
            return Ok(leaveDTO);
        }
        [HttpPost]
        public IActionResult CreateLeave([FromBody] LeaveDTO leaveDto)
        {
            if (leaveDto == null) return BadRequest();
            if (_leaveRepo.LeaveExists(leaveDto.EmployeeId))
            {
                ModelState.AddModelError("", $"Leave in use!!{leaveDto.EmployeeId}");
                return NotFound("Already Leave Applied ");
            }
            var leave = _mapper.Map<LeaveType>(leaveDto);
            if (!_leaveRepo.CreateLeave(leave))
            {
                ModelState.AddModelError("", $"Something went wrong while save data!!{leave.EmployeeId}");
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
            return CreatedAtRoute("GetLeave", new { leaveId = leave.Id }, leave);
        }
        [HttpPut]
        public IActionResult UpdateLeave([FromBody] LeaveDTO leaveDTO)
        {
            if (leaveDTO == null) return BadRequest();
            var leave = _mapper.Map<LeaveType>(leaveDTO);
            if (!_leaveRepo.UpdateLeave(leave))
            {
                ModelState.AddModelError("", $"Something went wrong while update data!!{leave.EmployeeId}");
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
            return NoContent();
        }
        [HttpDelete("{leaveId:int}")]
        public IActionResult Delete(int leaveId)
        {
            var leaveInDb = _leaveRepo.GetLeave(leaveId);
            if (leaveInDb == null) return NotFound();
            if (!_leaveRepo.DeleteLeave(leaveInDb))
            {
                ModelState.AddModelError("", $"Something went wrong while Delete data!!{leaveInDb.Id}");
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
            return Ok(leaveInDb);
        }
    }
}
