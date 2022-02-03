using Blog.Config;
using Blog.Models;
using Blog.Models.DTO;
using Blog.Repositories;
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
    //public class NewUser
    //{
    //    public string name { get; set; }
    //    public string phoneNumber { get; set; }
    //    public string email { get; set; }
    //    public string password { get; set; }
    //}

    [ApiController]
    [Route("api/[controller]/[action]")]
    public class AccountController : Controller
    {
        
        /// <summary>
        ///                 в последствии убрать этот код при замене на 3tier
        /// </summary>
        private readonly UserManager<User> userManager;
        private readonly SignInManager<User> signInManager;
        private readonly IUserRepository repository;



        public AccountController(UserManager<User> userManager, SignInManager<User> signInManager, IUserRepository repository)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.repository = repository;

        }
        /// <summary>
        /// 
        /// </summary>


        //[HttpPost]
        //public IActionResult SignIn(NewUser user)
        //{
        //    //// заменить юзера на 2 переменные
        //    var identity = GetIdentityAsync(user.name, user.password);
        //    if (identity == null)
        //    {
        //        return BadRequest(new { error = "Invalid login and/or password" });
        //    }
        //    string token = Token(identity);

        //    //AuthOptions authOptions = new AuthOptions();
        //    //var token = authOptions.GenerateToken(user.Id);

        //    return Json(new
        //    {
        //        access_token = token,
        //        user_name = user.name
        //    });

        //}


        [HttpPost]
        public async Task<IActionResult> SignIn(SignInModel signIn)
        {
            //// заменить юзера на 2 переменные
            var identity = await GetIdentityAsync(signIn.Name, signIn.Password);
            //if (identity == null)
            //{
            //    return BadRequest(new { error = "Invalid login and/or password" });
            //}
            var result = await signInManager.PasswordSignInAsync(signIn.Name, signIn.Password, false, false);
            //userManager.CreateSecurityTokenAsync
            //AuthOptions authOptions = new AuthOptions();

            var user = repository.GetByName(signIn.Name);

            AuthOptions authOptions = new AuthOptions();
            var token = authOptions.GenerateToken(user.Id);

            return Json(new
            {
                access_token = token,
                user_name = user.UserName
            });
            //var token = authOptions.GenerateToken(user.Id);

            //return Json(new
            //{
            //    access_token = token,
            //    user_name = user.name
            //});

            //var user = repository.GetByEmail(user1.);
            //if (user == null)
            //{
            //    return BadRequest(new { message = "Invalid email" });
            //}
            //if (!BCrypt.Net.BCrypt.Verify(model.Password, user.Password))
            //{
            //    return BadRequest(new { message = "Invalid password" });
            //}
            //var jwt = authService.GenerateToken(user.Id);

        }

        [HttpPost]
        public IActionResult CheckToken(CheckTokenModel checkToken)
        {
            AuthOptions authOptions = new AuthOptions();
            var result = authOptions.Verify(checkToken.JWT);

            var user = repository.GetById(result.Issuer);

            if (user != null)
            {
                return Json(new
                {
                    access_token = checkToken.JWT,
                    user_name = user.UserName
                });
            }
            return BadRequest(new { error = "The token isn't correct" });
        }


        [HttpPost]
        public async Task<IActionResult> Register(RegisterModel register)
        {


            try
            {
                User user = new User { UserName = register.Name, PhoneNumber = register.PhoneNumber, Email = register.Email };

                IdentityResult result = await userManager.CreateAsync(user, register.Password);

                //string result = await CreateNewUserAsync(user);

                if (result.Succeeded)
                {
                    var identity = GetIdentityAsync(user.UserName, register.Password);
                    if (identity == null)
                    {
                        return BadRequest(new { error = "Invalid login and/or password" });
                    }
                    //string token = Token(identity);
                    AuthOptions authOptions = new AuthOptions();
                    var token = authOptions.GenerateToken(user.Id);

                    return Json(new
                    {
                        access_token = token,
                        user_name = user.UserName
                    });
                }
                return BadRequest(new { error = "Something went wrong. Please try again later" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = "Something went wrong. Please try again later" });
            }
        }

        //async Task<string> CreateNewUserAsync(User user)
        //{
        //    try
        //    {
        //        User newUser = new User
        //        {
        //            UserName = user.UserName,
        //            PhoneNumber = user.PhoneNumber,
        //            Email = user.Email
        //        };

        //        IdentityResult result = await userManager.CreateAsync(newUser, user.PasswordHash);

        //        return "successfully";
        //    }
        //    catch
        //    {
        //        return "error";
        //    }
        //}

        //string Token(Task<ClaimsIdentity> identity)
        //{
        //    try
        //    {
        //        AuthOptions authOptions = new AuthOptions();
        //        //authOptions.GenerateToken(identity.id);


        //        //string x = identity.Id.ToString();

        //        var jwt = new JwtSecurityToken(
        //        issuer: AuthOptions.ISSUER,
        //        audience: AuthOptions.AUDIENCE,
        //        /// может быть ошибка из за Result
        //        claims: identity.Result.Claims,


        //        ///
        //        expires: DateTime.Now.AddMinutes(AuthOptions.LIFETIME),
        //        signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256)
        //        ) ;

        //        var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);
        //            return encodedJwt;
        //    }
        //    catch
        //    {
        //        return "error getting token jwt";
        //    }
        //}

        //private void authOptionsGenerateToken()
        //{
        //    throw new NotImplementedException();
        //}

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
