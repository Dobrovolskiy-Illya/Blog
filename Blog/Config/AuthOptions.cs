using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Blog.Config
{
    public class AuthOptions
    {
        public const string ISSUER = "Blog";
        public const string AUDIENCE = "SomeClient";
        const string KEY = "DontTellSomeoneThisKeyRememberIt";
        public const int LIFETIME = 5;
        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.Default.GetBytes(KEY));
        }

        //public string GetSymmetricSecurityKey(string id)
        //{
        //    SymmetricSecurityKey symmetricSecurityKey = new SymmetricSecurityKey(Encoding.Default.GetBytes(KEY));
        //    SigningCredentials credentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256Signature);
        //    JwtHeader header = new JwtHeader(credentials);

        //    var payload = new JwtPayload(id.ToString(), AUDIENCE, null, null, DateTime.Today.AddDays(1));
        //    var securityToken = new JwtSecurityToken(header, payload);

        //    return new JwtSecurityTokenHandler().WriteToken(securityToken);
        //}

        public string GenerateToken(string id)
        {
            SymmetricSecurityKey symmetricSecurityKey = new SymmetricSecurityKey(Encoding.Default.GetBytes(KEY));
            SigningCredentials credentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256Signature);
            JwtHeader header = new JwtHeader(credentials);

            var payload = new JwtPayload(id.ToString(), AUDIENCE, null, null, DateTime.Today.AddDays(1));
            var securityToken = new JwtSecurityToken(header, payload);

            return new JwtSecurityTokenHandler().WriteToken(securityToken);
        }
        public JwtSecurityToken Verify(string jwt)
        {
            JwtSecurityTokenHandler tokenHanler = new JwtSecurityTokenHandler();
            var key = Encoding.Default.GetBytes(KEY);
            tokenHanler.ValidateToken(jwt, new TokenValidationParameters
            {
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuerSigningKey = true,
                ValidateIssuer = false,
                ValidateAudience = false
            }, out SecurityToken securityToken);
            return (JwtSecurityToken)securityToken;
        }
    }
}
