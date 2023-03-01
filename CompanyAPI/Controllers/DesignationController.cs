using CompanyAPI.Data;
using CompanyAPI.Models;
using CompanyAPI.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CompanyAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DesignationController : ControllerBase
    {
        private readonly IDesignationRepo _designation;
        private readonly ApplicationDbContext _context;
        public DesignationController(ApplicationDbContext context, IDesignationRepo designation)
        {
            _context = context;
            _designation = designation;
        }
        [HttpGet]
        public async Task<IActionResult> GetDesignations()
        {
            var Desg = await _designation.GetDesignation();
            if (Desg == null) return BadRequest("No Desg Found");
            return Ok(Desg);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetDesgById(int id)
        {
            var desg = await _designation.GetDesignationById(id);
            if (desg == null) return BadRequest("You Have To Add Designations");
            return Ok(desg);
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Designation designation)
        {
            await _designation.AddDesignation(designation);
            return Ok(designation);
        }
        [HttpPut("{id}")]
        public async Task Update(int id, [FromBody] Designation designation)
        {
            await _designation.UpdateDesignation(id, designation);
        }
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await _designation.DeleteDesignation(id);
        }
    }
}
