using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Entities;
using api.Models;
using api.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IJwtGenerator _jwtGenerator;
        private readonly IUserAccessor _userAccessor;

        public AuthController(UserManager<User> userManager, SignInManager<User> signInManager, IJwtGenerator jwtGenerator, IUserAccessor userAccessor)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _jwtGenerator = jwtGenerator;
            _userAccessor = userAccessor;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserAuth>> Login(UserCredentials credentials)
        {
            if (credentials == null)
            {
                return BadRequest();
            }
            var user = await _userManager.FindByEmailAsync(credentials.Email).ConfigureAwait(false);
            if (user == null)
            {
                return NotFound("User not found");
            }
            var result = await _signInManager.CheckPasswordSignInAsync(user, credentials.Password, false).ConfigureAwait(false);
            
            if (result.Succeeded)
            {
                var roles = await _userManager.GetRolesAsync(user).ConfigureAwait(false);
                return Ok(new UserAuth { Email = user.Email, UserName = user.UserName, Token = _jwtGenerator.CreateToken(user, roles) });
            }

            return Unauthorized();         
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserAuth>> Register(UserRegisterDto userRegister)
        {
            if (userRegister == null)
            {
                return BadRequest("");
            }

            var userByEmail = await _userManager.FindByEmailAsync(userRegister.Email).ConfigureAwait(false);
            var userByName = await _userManager.FindByNameAsync(userRegister.UserName).ConfigureAwait(false);

            if (userByEmail != null || userByName != null)
            {
                return BadRequest("User exists");
            }

            var user = new User
            {
                Email = userRegister.Email,
                UserName = userRegister.UserName
            };

            var result = await _userManager.CreateAsync(user, userRegister.Password).ConfigureAwait(false);

            if (result.Succeeded)
            {
                return Ok(new UserAuth { Email = user.Email, UserName = user.UserName, Token = _jwtGenerator.CreateToken(user, new List<string>()) });
            }

            return BadRequest(result.Errors);
        }
   
   
        [HttpGet("user")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
         public async Task<ActionResult<UserDto>> GetCurrentUser()
         {
            var userName = _userAccessor.GetCurrentUserName();
            var user = await _userManager.FindByNameAsync(userName).ConfigureAwait(false);
            if (user == null)
            {
                return NotFound("User not found");
            }
            var roles = await _userManager.GetRolesAsync(user).ConfigureAwait(false);

            var userDto = new UserDto() 
            { 
                Email = user.Email, 
                UserName = user.UserName 
            };

            foreach (var role in roles)
            {
                userDto.Roles.Add(role);
            }

            return userDto;

         }
    }
}