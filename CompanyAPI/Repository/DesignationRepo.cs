using CompanyAPI.Data;
using CompanyAPI.Models;
using Microsoft.EntityFrameworkCore;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace CompanyAPI.Repository
{
    public class DesignationRepo:IDesignationRepo
    {
        private readonly ApplicationDbContext _context;

        public DesignationRepo(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task AddDesignation(Designation designation)
        {
            await _context.Designations.AddAsync(designation);
            await _context.SaveChangesAsync();
        }
        public async Task DeleteDesignation(int id)
        {
            var desInDb = await _context.Designations.FindAsync(id);
            _context.Designations.Remove(desInDb);
            await _context.SaveChangesAsync();
        }
        public async Task<List<Designation>> GetDesignation()
        {
            return await _context.Designations.ToListAsync();
        }
        public async Task<Designation> GetDesignationById(int id)
        {
            return await _context.Designations.Include(x => x.Employees).Where(x => x.Id == id).FirstOrDefaultAsync();
        }
        public async Task UpdateDesignation(int id, Designation designation)
        {
            _context.Designations.Update(designation);
            await _context.SaveChangesAsync();
        }
    }
}
