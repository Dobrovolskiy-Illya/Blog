using Blog.Config;
using Blog.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Blog.Controllers.Api
{
    public class NewUser
    {
        public string name { get; set; }
        public string phoneNumber { get; set; }
        public string email { get; set; }
        public string password { get; set; }
    }

    [ApiController]
    [Route("api/[controller]/[action]")]
    public class AccountController : Controller
    {
        
        /// <summary>
        ///                 в последствии убрать этот код при замене на 3tier
        /// </summary>
        private readonly UserManager<User> userManager;
        private readonly SignInManager<User> signInManager;

        public AccountController(UserManager<User> userManager, SignInManager<User> signInManager)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
        }
        /// <summary>
        /// 
        /// </summary>


        [HttpPost]
        public IActionResult SignIn(NewUser user)
        {
            //// заменить юзера на 2 переменные
            var identity = GetIdentityAsync(user.name, user.password);
            if (identity == null)
            {
                return BadRequest(new { error = "Invalid login and/or password" });
            }
            string token = Token(identity);

            return Json(new
            {
                access_token = token,
                user_name = user.name
            });
        }


        [HttpPost]
        public async Task<IActionResult> Register(NewUser newUser)
        {

            try
            {
                User user = new User { UserName = newUser.name, PhoneNumber = newUser.phoneNumber, Email = newUser.email };

                IdentityResult result = await userManager.CreateAsync(user, newUser.password);

                //string result = await CreateNewUserAsync(user);

                if (result.Succeeded)
                {
                    var identity = GetIdentityAsync(user.UserName, newUser.password);
                    if (identity == null)
                    {
                        return BadRequest(new { error = "Invalid login and/or password" });
                    }
                    string token = Token(identity);

                    return Json(new
                    {
                        access_token = token,
                        user_name = user.UserName
                    });
                }
                return BadRequest(new { error = "Something went wrong. Please try again later" });
            }
            catch
            {
                return BadRequest(new { error = "Something went wrong. Please try again later" });
            }
        }

        async Task<string> CreateNewUserAsync(User user)
        {
            try
            {
                User newUser = new User
                {
                    UserName = user.UserName,
                    PhoneNumber = user.PhoneNumber,
                    Email = user.Email
                };

                IdentityResult result = await userManager.CreateAsync(newUser, user.PasswordHash);

                return "successfully";
            }
            catch
            {
                return "error";
            }
        }

        string Token(Task<ClaimsIdentity> identity)
        {
            try
            {
                var jwt = new JwtSecurityToken(
                issuer: AuthOptions.ISSUER,
                audience: AuthOptions.AUDIENCE,
                /// может быть ошибка из за Result
                claims: identity.Result.Claims,
                ///
                expires: DateTime.Now.AddMinutes(AuthOptions.LIFETIME),
                signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256)
                );

                var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);
                return encodedJwt;
            }
            catch
            {
                return "error getting token jwt";
            }
        }

        async Task<ClaimsIdentity> GetIdentityAsync(string login, string password)
        {
            var result = await signInManager.PasswordSignInAsync(login, password, true, false);
            if (result.Succeeded)
            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, login),
                    new Claim(ClaimsIdentity.DefaultRoleClaimType, password)
                };
                ClaimsIdentity claimsIdentity =
                    new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType, ClaimsIdentity.DefaultRoleClaimType);
                return claimsIdentity;
            }
            return null;
        }
    }
}
