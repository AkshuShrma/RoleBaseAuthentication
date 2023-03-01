using CompanyAPI.Data;
using CompanyAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace CompanyAPI.Repository
{
    public class CompanyRepo : ICompany
    {
        private readonly ApplicationDbContext _context;
        public CompanyRepo(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task AddCompany(Company company)
        {
            await _context.Company.AddAsync(company);
            await _context.SaveChangesAsync();
        }
        public async Task DeleteCompany(int id)
        {
            var companyInDb = await _context.Company.FindAsync(id);
            _context.Company.Remove(companyInDb);
            await _context.SaveChangesAsync();
        }
        public async Task<List<Company>> GetCompanies()
        {
            return await _context.Company.ToListAsync();
        }
        public async Task<Company> GetCompanyById(int id)
        {
            return await _context.Company.Include(x => x.Employees).Where(x => x.Id == id).FirstOrDefaultAsync();
        }
        public async Task UpdateCompany(int id, Company company)
        {
            _context.Company.Update(company);
            await _context.SaveChangesAsync();
        }
    }
}
