using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AdminUI.Models;
using AdminUI.ViewModel;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Microsoft.EntityFrameworkCore;
using AdminUI.Services;
using AdminUI.ViewModels;

namespace AdminUI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private ReportingContext _context;
        //private IAccountService _account;
        public AccountController(ReportingContext context)
        {
            _context = context;
            //_account = account;
        }


        // GET: api/Account
        [Authorize]
        [HttpGet]
        public IEnumerable<string> Get()
        {
            var login = HttpContext.User.Identity.IsAuthenticated;
            //var list = HttpContext.User.Claims.ToList();
            var list = HttpContext.Request?.Headers["Authorization"].ToString().Split(' ');
            var code = HttpContext.User.Claims.ToList();
            var handler = new JwtSecurityTokenHandler();
            var tokenS = handler.ReadToken(list[1]) as JwtSecurityToken;

            var jti = tokenS.Claims.First(claim => claim.Type == "issuer").Value;
            return new string[] { "value1", "value2" };
        }
        [Route("token")]
        public async Task<IActionResult> TokenBased()
        {
            var test = "dsfdsfs";
            ReportingContext db = new ReportingContext();
            var list = await db.Users.ToListAsync(); ;
            return Unauthorized();
        }
        [HttpPost, Route("login")]
        public IActionResult Login(LoginModel user)
        {
            //var tokenstring = _account.Logon(user);
            //if (tokenstring.Length !=0)
            //{
            //    return Ok(new { Token = tokenstring });
            //}
            var hashpwd = Encryptdata.MD5Hash(user.Password);
            var qury = _context.Users.Where(v => v.Email == user.Email && v.Password == hashpwd).FirstOrDefault();
            if (qury!=null)
            {
                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("KeyForSignInSecret@1234"));
                var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

                var Claims = new[]
               {
                        new Claim(JwtRegisteredClaimNames.Sub,user.Email),
                        new Claim(JwtRegisteredClaimNames.Email,user.Email),
                        new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString())
                       };
                var tokeOptions = new JwtSecurityToken(
                    issuer: "www.google.com",
                    audience: "www.google.com",
                    Claims,
                    expires: DateTime.Now.AddMinutes(20),
                    signingCredentials: signinCredentials
                );

                var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
                UserDetail userDetail = new UserDetail()
                {
                    Token = tokenString,
                    UserId = qury.UserId,
                    UserName = qury.Email,
                    IsAdmin=qury.IsAdmin
                };

                return Ok(userDetail);
            }
            else
            {
                return Unauthorized();

            }
        }


        public async Task Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);

        }


        // GET: api/Account/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Account
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/Account/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
