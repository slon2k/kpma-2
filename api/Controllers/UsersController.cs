using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Entities;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator")]
    public class UsersController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public UsersController(UserManager<User> userManager, RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }

        [HttpGet]
        public ActionResult<IEnumerable<User>> GetUsers()
        {
            var users = _userManager.Users.ToList();
            return Ok(users);
        }

        [HttpGet("{userName}")]
        public async Task<ActionResult> GetUserDetails(string userName)
        {
            var user = await _userManager.FindByNameAsync(userName).ConfigureAwait(false);
            if (user == null)
            {
                return NotFound("User not found");
            }

            return Ok(user);
        }

        [Route("{userName}/roles")]
        [HttpGet]
        public async Task<ActionResult> GetUserRoles(string userName)
        {
            var user = await _userManager.FindByNameAsync(userName).ConfigureAwait(false);
            if (user == null)
            {
                return NotFound("User not found");
            }
            var roles = await _userManager.GetRolesAsync(user).ConfigureAwait(false);

            return Ok(roles);
        }

        [Route("{userName}/roles")]
        [HttpPost]
        public async Task<ActionResult> UpdateUserRoles(string userName, IEnumerable<string> roles)
        {
            if (roles == null)
            {
                return BadRequest();
            }
            
            var user = await _userManager.FindByNameAsync(userName).ConfigureAwait(false);
            
            if (user == null)
            {
                return NotFound("User not found");
            }

            foreach (var item in roles)
            {
                var roleExists = await _roleManager.RoleExistsAsync(item).ConfigureAwait(false);
                if (!roleExists)
                {
                    return BadRequest("Role does not exist: " + item);
                }
            }

            var oldRoles = await _userManager.GetRolesAsync(user).ConfigureAwait(false);

            foreach (var item in oldRoles)
            {
                if (!roles.Contains(item))
                {
                    await _userManager.RemoveFromRoleAsync(user, item).ConfigureAwait(false);
                }
            }

            foreach (var item in roles)
            {
                if (!oldRoles.Contains(item))
                {
                    await _userManager.AddToRoleAsync(user, item).ConfigureAwait(false);
                }
            }

            var newRoles = await _userManager.GetRolesAsync(user).ConfigureAwait(false);

            return Ok(newRoles);
        }
    }
}