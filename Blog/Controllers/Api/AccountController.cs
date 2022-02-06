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
   

    [ApiController]
    [Route("api/[controller]/[action]")]
    public class AccountController : Controller
    {
        
      
        private readonly UserManager<User> userManager;
        private readonly SignInManager<User> signInManager;
        private readonly IUserRepository repository;



        public AccountController(UserManager<User> userManager, SignInManager<User> signInManager, IUserRepository repository)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.repository = repository;

        }
       


       


        [HttpPost]
        public async Task<IActionResult> SignIn(SignInModel signIn)
        {
            //add try-catch


            var identity = await GetIdentityAsync(signIn.Name, signIn.Password);
            //if (identity == null)
            //{
            //    return BadRequest(new { error = "Invalid login and/or password" });
            //}
            var result = await signInManager.PasswordSignInAsync(signIn.Name, signIn.Password, false, false);
           
            var user = repository.GetByName(signIn.Name);

            AuthOptions authOptions = new AuthOptions();
            var token = authOptions.GenerateToken(user.Id);

            return Json(new
            {
                access_token = token,
                user_name = user.UserName
            });
           

        }

        [HttpPost]
        public IActionResult CheckToken(CheckTokenModel checkToken)
        {
            AuthOptions authOptions = new AuthOptions();
            var result = authOptions.Verify(checkToken.JWT);
            //добавить условия и обернуть в try - catch
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


                if (result.Succeeded)
                {
                    var identity = GetIdentityAsync(user.UserName, register.Password);
                    if (identity == null)
                    {
                        return BadRequest(new { error = "Invalid login and/or password" });
                    }
                    AuthOptions authOptions = new AuthOptions();
                    var token = authOptions.GenerateToken(user.Id);
                    try
                    {
                        string message = $"Сохраните данные для входа. \nlogin: { user.UserName}\nPassword: { register.Password}";
                        EmailService emailService = new EmailService();
                        await emailService.SendEmailAsync($"{user.Email}", "Спасибо за регистрацию", message);
                    }
                    catch(Exception ex)
                    {
                        int x = 0;
                        int y = 0;
                    }

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
