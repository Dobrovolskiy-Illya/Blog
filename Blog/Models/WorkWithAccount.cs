//using Blog.Config;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.IdentityModel.Tokens;
//using System;
//using System.Collections.Generic;
//using System.IdentityModel.Tokens.Jwt;
//using System.Linq;
//using System.Security.Claims;
//using System.Threading.Tasks;

//namespace Blog.Models
//{
//    public static class WorkWithAccount
//    {

//        public static IActionResult SignInUser(User user)
//        {

//            return null;
           
//        }



//        public IActionResult Token(TempUser user)
//        {
//            var identity = GetIdentity(user.Login, user.Password);
//            if (identity == null)
//            {
//                return BadRequest(new { error = "Invalid login and/or password" });
//            }

//            var jwt = new JwtSecurityToken(
//                issuer: AuthOptions.ISSUER,
//                audience: AuthOptions.AUDIENCE,
//                claims: identity.Claims,
//                expires: DateTime.Now.AddMinutes(AuthOptions.LIFETIME),
//                signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256)
//                );

//            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);
//            return Json(new
//            {
//                access_token = encodedJwt
//            });
//        }




//        private ClaimsIdentity GetIdentity(string login, string password)
//        {
//            if (login == admin.Login && password == admin.Password)
//            {
//                var claims = new List<Claim>
//                {
//                    new Claim(ClaimsIdentity.DefaultNameClaimType, admin.Login),
//                    new Claim(ClaimsIdentity.DefaultRoleClaimType, admin.Password)
//                };
//                ClaimsIdentity claimsIdentity =
//                    new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType, ClaimsIdentity.DefaultRoleClaimType);
//                return claimsIdentity;
//            }
//            return null;
//        }
//    }
//}
