using CompanyAPI.Models;

namespace CompanyAPI.Repository
{
    public interface IDesignationRepo
    {
        Task<List<Designation>> GetDesignation();
        Task<Designation> GetDesignationById(int id);
        Task AddDesignation(Designation designation);
        Task UpdateDesignation(int id, Designation designation);
        Task DeleteDesignation(int id);
    }
}
