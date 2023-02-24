using CompanyAPI.Data;
using System.Security.Claims;

namespace CompanyAPI.Services
{
    public interface IRefreshTokenGenerator
    {
        ApplicationUser GenerateToken(ApplicationUser user, bool isGenerateRefreshToken);
        ClaimsPrincipal? GetClaimsFromExpiredToken(string token);
    }
}
