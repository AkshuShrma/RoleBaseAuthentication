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
            await _context.Companies.AddAsync(company);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteCompany(int id)
        {
            var companyInDb = await _context.Companies.FindAsync(id);
            _context.Companies.Remove(companyInDb);
            await _context.SaveChangesAsync();
        }

        public async Task<List<Company>> GetCompanies()
        {
            return await _context.Companies.ToListAsync();
        }

        public async Task<Company> GetCompanyById(int id)
        {
            return await _context.Companies.FirstOrDefaultAsync(v => v.Id == id);
        }

        public async Task UpdateCompany(int id, Company company)
        {
            _context.Companies.Update(company);
            await _context.SaveChangesAsync();
        }
    }
}
