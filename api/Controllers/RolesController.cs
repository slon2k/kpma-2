using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Entities;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator")]
    public class RolesController : ControllerBase
    {
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly UserManager<User> _userManager;

        public RolesController(RoleManager<IdentityRole> roleManager, UserManager<User> userManager)
        {
            _roleManager = roleManager;
            _userManager = userManager;
        }

        [HttpGet]
        public ActionResult GetRoles()
        {
            return Ok(_roleManager.Roles.ToList());
        }

        [HttpPost]
        public async Task<ActionResult> CreateRole(string name)
        {
            if (string.IsNullOrWhiteSpace(name))
            {
                return BadRequest("Name is empty");
            }
            
            var roleExists = await _roleManager.RoleExistsAsync(name).ConfigureAwait(false);
            
            if (roleExists)
            {
                return BadRequest("Role exists");
            }

            var result = await _roleManager.CreateAsync(new IdentityRole(name)).ConfigureAwait(false);

            if (result.Succeeded)
            {
                var role = await _roleManager.FindByNameAsync(name).ConfigureAwait(false);
                return Ok(role);
            }

            return BadRequest(result.Errors);
        }
    }
}