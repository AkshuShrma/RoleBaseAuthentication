using CompanyAPI.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace CompanyAPI.Services
{
    public class Authentication : IAuthentication
    {
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManagaer;
        private readonly IRefreshTokenGenerator _tokenGenrator;
        private readonly JWTSetting _jwtSetting;
        public Authentication(SignInManager<ApplicationUser> signInManager, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, IRefreshTokenGenerator tokenGenrator, IOptions<JWTSetting> jwtSetting)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _tokenGenrator = tokenGenrator;
            _jwtSetting = jwtSetting.Value;
            _roleManagaer = roleManager;
        }
        public async Task<ApplicationUser?> AddOrUpdateUserRefreshToken(ApplicationUser user)
        {
            user.RefreshTokenValidDate = DateTime.Now.AddDays(_jwtSetting.RefreshTokenExpireDays);
            var userD = await _userManager.UpdateAsync(user);
            return userD.Succeeded ? user : null;
        }
        public async Task<ApplicationUser?> AuthenticateUser(string userName, string userPassword)
        {
            var userExist = await _userManager.FindByNameAsync(userName);
            var userVerification = await _signInManager.CheckPasswordSignInAsync(userExist, userPassword, false);
            if (!userVerification.Succeeded) return null;
            var roleUser = await _userManager.GetRolesAsync(userExist);
            userExist.Role = roleUser.FirstOrDefault();
            if (userExist.RefreshTokenValidDate < DateTime.Now)
            {
                var userTokenGenerated = _tokenGenrator.GenerateToken(userExist, true);
                return await AddOrUpdateUserRefreshToken(userTokenGenerated);
            }
            return _tokenGenrator.GenerateToken(userExist, false);
        }
        public async Task<bool> IsUnique(string userName)
        {
            var userExist = await _userManager.FindByNameAsync(userName);
            if (userExist == null) return true;
            return false;
        }
        public async Task<bool> RegisterUser(ApplicationUser userCredentials)
        {
            if (await _roleManagaer.FindByNameAsync(userCredentials.Role) == null) return false;
            /* if (userCredentials.Role == SD.Role_Admin)
             {
                 var CheckAdmin = await _userManager.GetUsersInRoleAsync(SD.Role_Admin);
                 if (CheckAdmin.Count == 1) return false;
             }*/
            var user = await _userManager.CreateAsync(userCredentials, userCredentials.PasswordHash);
            if (!user.Succeeded) return false;
            await _userManager.AddToRoleAsync(userCredentials, userCredentials.Role);
            return true;
        }
        public async Task<ApplicationUser?> CheckUserInDb(string userName)
        {
            var checkUserInDb = await _userManager.FindByIdAsync(userName);
            if (checkUserInDb == null) return null;
            var userGetRole = await _userManager.GetRolesAsync(checkUserInDb);
            checkUserInDb.Role = userGetRole?.FirstOrDefault();
            return checkUserInDb;
        }
        public string? GeneratePassword()
        {
            int length = 10;
            Random random = new Random();
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@";
            StringBuilder Password = new StringBuilder();
            for (int i = 0; i < length; i++)
            {
                Password.Append(chars[random.Next(chars.Length)]);
            }
            return Password.ToString();
        }
    }
}
