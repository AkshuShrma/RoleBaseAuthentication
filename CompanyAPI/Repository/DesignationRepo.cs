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
            await _context.Designation.AddAsync(designation);
            await _context.SaveChangesAsync();
        }
        public async Task DeleteDesignation(int id)
        {
            var desInDb = await _context.Designation.FindAsync(id);
            _context.Designation.Remove(desInDb);
            await _context.SaveChangesAsync();
        }
        public async Task<List<Designation>> GetDesignation()
        {
            return await _context.Designation.ToListAsync();
        }
        public async Task<Designation> GetDesignationById(int id)
        {
            return await _context.Designation.Where(x => x.Id == id).FirstOrDefaultAsync();
        }
        public async Task UpdateDesignation(int id, Designation designation)
        {
           // await _context.Designations.Where(x=>x.CompanyId==id).FirstOrDefaultAsync();
             _context.Designation.Update(designation);
            await _context.SaveChangesAsync();
        }
    }
}
