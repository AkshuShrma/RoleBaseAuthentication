using CompanyAPI.Data;
using CompanyAPI.Models;
using CompanyAPI.Repository;
using CompanyAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace CompanyAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize(Roles = SD.Role_Admin+","+SD.Role_Company)]
    public class DesignationController : ControllerBase
    {
        private readonly IDesignationRepo _designation;
        private readonly ApplicationDbContext _context;
        private readonly IAuthentication _userService;
        public DesignationController(ApplicationDbContext context, IDesignationRepo designation, IAuthentication userService)
        {
            _context = context;
            _designation = designation;
            _userService = userService;
        }
        [HttpGet]
        public async Task<IActionResult> GetDesignations()
        {
            var Desg = await _designation.GetDesignation();
            if (Desg == null) return BadRequest("No Desg Found");
            return Ok(Desg);
        }
        [HttpGet("{id}")]
        public async Task<Designation> GetDesgById(int id)
        {
            return await _designation.GetDesignationById(id); ;
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Designation designation)
        {
            await _designation.AddDesignation(designation);
            return Ok(designation);
        }
        [HttpPut]
        public async Task<IActionResult> Update(int id, [FromBody] Designation designation)
        {
            await _designation.UpdateDesignation(id, designation);
            if (designation == null) return BadRequest("Data Not Updated");
            return Ok(designation);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _designation.DeleteDesignation(id);
            return Ok("Data Deleted");
        }
    }
}
