using CompanyAPI.Models;
using CompanyAPI.Repository;

namespace CompanyAPI.Repository
{
    public interface ICompany
    {
        Task<List<Company>> GetCompanies();
        Task<Company> GetCompanyById(int id);
        Task AddCompany(Company company);
        Task UpdateCompany(int id, Company company);
        Task DeleteCompany(int id);
    }
}
