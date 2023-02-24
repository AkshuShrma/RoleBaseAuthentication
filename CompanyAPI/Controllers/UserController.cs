using CompanyAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Authorization;
using CompanyAPI.Models.DTO;
using AutoMapper;
using CompanyAPI.Services;
using CompanyAPI.Data;

namespace CompanyAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IAuthentication _userService;
        private readonly IRefreshTokenGenerator _jwtManager;
        private readonly IMapper _mapper;
        public UserController(IAuthentication userService, IMapper mapper, IRefreshTokenGenerator jwtManager)
        {
            _userService = userService;
            _mapper = mapper;
            _jwtManager = jwtManager;
        }
        [Route("Login")]
        [HttpPost]
        public async Task<IActionResult> Login([FromBody] LoginModel user)
        {
            if (await _userService.IsUnique(user.UserName)) return BadRequest("Please Register");
            var userAuthorize = await _userService.AuthenticateUser(user.UserName, user.Password);
            if (userAuthorize == null) return NotFound("Invalid Attempt");
            return Ok(userAuthorize);
        }
        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register([FromBody] UserRegister userRegister)
        {
            if (userRegister == null || !ModelState.IsValid) return BadRequest();
            var ApplicationUser = _mapper.Map<ApplicationUser>(userRegister);
            ApplicationUser.PasswordHash = userRegister.Password;
            if (!await _userService.IsUnique(userRegister.UserName)) return NotFound("Go to login");
            var registerUser = await _userService.RegisterUser(ApplicationUser);
            if (!registerUser) return StatusCode(StatusCodes.Status500InternalServerError);
            return Ok("Register Successfully");
        }
        [Route("RefreshToken")]
        [HttpPost]
        public async Task<IActionResult> RefreshToken(Refreshtoken userToken)
        {
            if (userToken == null || !ModelState.IsValid)
            {
                return BadRequest();
            }
            var claimToken = _jwtManager.GetClaimsFromExpiredToken(userToken.Token);
            if (claimToken == null)
            {
                return BadRequest();
            }
            var claimIdentity = claimToken.Identity as ClaimsIdentity;
            var claimUser = claimIdentity?.FindFirst(ClaimTypes.Name) ?? null;
            if (claimUser == null)
            {
                return Unauthorized();
            }
            var checkInDb = await _userService.CheckUserInDb(claimUser.Value);
            if (checkInDb == null) { return BadRequest(); }
            if (checkInDb.RefreshToken != userToken.RefreshToken) return Unauthorized("Go Login First");
            if (checkInDb.RefreshTokenValidDate < DateTime.Now) return BadRequest();
            var generateNewToken = _jwtManager.GenerateToken(checkInDb, false);
            Refreshtoken usertoken = new Refreshtoken()
            {
                Token = generateNewToken?.Token ?? "null",
                RefreshToken = generateNewToken?.RefreshToken ?? "null",
            };
            return Ok(usertoken);
        }
    }
}
