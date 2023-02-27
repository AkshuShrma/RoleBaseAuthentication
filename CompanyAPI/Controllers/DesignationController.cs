using CompanyAPI.Data;
using CompanyAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CompanyAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DesignationController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public DesignationController(ApplicationDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var desg = await (from desgn in _context.Designations
                              select new
                              {
                                  Id = desgn.Id,
                                  Name = desgn.Name,
                                  CompanyId= desgn.CompanyId,
                              }).ToListAsync();
            return Ok(desg);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> DesDetails(int id)
        {
            var desg = await(_context.Designations.Include(x=>x.Employees).Where(x=>x.Id== id).FirstOrDefaultAsync());
            return Ok(desg);
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]Designation designation)
        {
            await _context.Designations.AddAsync(designation);
            await _context.SaveChangesAsync();
            return StatusCode(StatusCodes.Status201Created);
        }
    }
}
