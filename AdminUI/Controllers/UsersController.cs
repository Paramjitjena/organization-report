using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using AdminUI.Models;
using System.Security.Cryptography;
using System.Text;
using AdminUI.Services;
using Newtonsoft.Json;
using AdminUI.ViewModels;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AdminUI.Controllers
{
    [Route("api/[controller]")]
    public class UsersController : Controller
    {

        private readonly ReportingContext _context;
        public UsersController(ReportingContext context)
        {
            _context = context;
        }

        [HttpPost]
        [Route("addUser")]
        //[FromBody]
        //Users user
        public IActionResult AddUser([FromBody] Users user)
        {
            try
            {

                if (_context.Users.Any(x => x.Email == user.Email))
                {
                    return BadRequest("Error: There is already User existing with the email entered!");
                }
                else
                {
                    var hashpwd = Encryptdata.MD5Hash(user.Password);
                    _context.Users.Add(new Users { Title = user.Title, FirstName = user.FirstName, LastName = user.LastName, Email = user.Email, Password = hashpwd, Phone = user.Phone, Address = user.Address, IsAdmin = user.IsAdmin, CreationDate = DateTime.Now });
                    _context.SaveChanges();
                    return Ok("Success");
                }

            }
            catch (Exception ex)
            {
                return BadRequest("Error:" + ex.Message);
            }
        }



        [HttpGet]
        [Route("getUsers")]


        public IActionResult Get(Users user)
        {
            try
            {
                var users = _context.Users.Select(x => new
                {
                    UserId = x.UserId,
                    FirstName = x.FirstName,
                    Title = x.Title,
                    LastName = x.LastName,
                    Email = x.Email,
                    Phone = x.Phone,
                    Isadmin = x.IsAdmin,
                    Address = x.Address,

                }).ToList();

                return Ok(JsonConvert.SerializeObject(users));


            }
            catch (Exception ex)
            {
                return BadRequest();

            }
        }

    
        [HttpPost]
        [Route("updateUser")]
        public string UpdateUser([FromBody] UpdateUser user)
        {
            try
            {
                if (_context.Users.Any(x => x.UserId == user.UserId))
                {
                    var UserDetails = _context.Users.Find(user.UserId);
                    UserDetails.Title = user.Title;
                    UserDetails.FirstName = user.FirstName;
                    UserDetails.LastName = user.LastName;
                    UserDetails.Email = user.Email;
                    UserDetails.Phone = user.Phone;
                    UserDetails.IsAdmin = user.IsAdmin;
                    UserDetails.Address = user.Address;

                    _context.SaveChanges();
                    return "Success";

                }
                else
                {
                    return "Error: Group not found!";
                }
            }
            catch (Exception ex)
            {
                return "Error:" + ex.Message;
            }
        }

        [HttpPost]
        [Route("deleteUser/{UserId}")]
        public string DeleteUser(int UserId)
        {
            try
            {
                if (_context.Users.Any(x => x.UserId == UserId))
                {
                    var UserDetails = _context.Users.Find(UserId);
                    _context.Users.Remove(UserDetails);
                    _context.SaveChanges();
                    return "Ok";
                }
                else
                {
                    return "User not found !";
                }
                return "ok";
            }
            catch (Exception)
            {

                return "User not deleted !";
            }

        }
   
    }
}
