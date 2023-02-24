using CompanyAPI.Data;

namespace CompanyAPI.Services
{
    public interface IAuthentication
    {
        Task<bool> IsUnique(string userName);
        Task<ApplicationUser?> AuthenticateUser(string userName, string userPassword);
        Task<bool> RegisterUser(ApplicationUser userCredentials);
        Task<ApplicationUser?> AddOrUpdateUserRefreshToken(ApplicationUser user);
        Task<ApplicationUser?> CheckUserInDb(string userName);
        public string? GeneratePassword();
    }
}
