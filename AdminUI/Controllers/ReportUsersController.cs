using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AdminUI.Models;
using AdminUI.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace AdminUI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportUsersController : ControllerBase
    {
        private readonly ReportingContext _context;
        public ReportUsersController(ReportingContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("savesearch")]
        public IActionResult Savesearch()
        {
            var users = _context.SavedSearches.Where(x => x.IsPublic == true).Select(x => new
            {
                searchid = x.SearchId,
                userid = x.UserId,
                field = x.Field,
                op1 = x.Operator1,
                op2 = x.Operator2,
                val1 = x.Value1,
                val2 = x.Value2,
                log = x.Logic,
                searchname = x.Searchname,

            }).ToList();
            return Ok(JsonConvert.SerializeObject(users));
        }

        [HttpGet]
        [Route("getallsearch")]
        public IActionResult Getallsearch()
        {
            var users = _context.SavedSearches.Select(x => new
            {
                searchid = x.SearchId,
                userid = x.UserId,
                field = x.Field,
                op1 = x.Operator1,
                op2 = x.Operator2,
                val1 = x.Value1,
                val2 = x.Value2,
                log = x.Logic,
                searchname = x.Searchname,
                isPublic=x.IsPublic

            }).ToList();
            return Ok(JsonConvert.SerializeObject(users));
        }

        [HttpGet]
        [Route("getallsearch/{userId}")]
        public IActionResult Getallsearch(int userId)
        {

            var users = _context.SavedSearches.Where(x => x.UserId == userId).Select(x => new
            {
                searchid = x.SearchId,
                userid = x.UserId,
                field = x.Field,
                op1 = x.Operator1,
                op2 = x.Operator2,
                val1 = x.Value1,
                val2 = x.Value2,
                log = x.Logic,
                searchname = x.Searchname,
                isPublic = x.IsPublic

            }).ToList();
            return Ok(JsonConvert.SerializeObject(users));
        }




        [HttpGet]
        [Route("users")]
        public IActionResult getusers()
        {
            var users = _context.ReportUsers.Select(x => new
            {

                //{ "id":1,"jobtitle":"president","color":"","entitystate":2,"entitykey":{ "entitysetname":"orgchartshapes","entitycontainername":"sampleentities","entitykeyvalues":[{"key":"id","value":1}],"istemporary":false}}
                id = x.UserId,
                fullname = x.Fname + x.Lname,
                employeeid = x.EmployeeId,
                active = x.Active

            }).ToList();

            return Ok(JsonConvert.SerializeObject(users));
        }
        [HttpGet]
        [Route("GetUserId")]
        public IActionResult GetId()
        {
            // var qry = _context.SavedSearches.Select());
            int id = _context.SavedSearches.Max(p => p.UserId);
            int i = id + 1;
            return Ok(i++);
        }

        [HttpPost, Route("public")]
        public IActionResult MakePublish(PublicPrivateSearch search)
        {
            var query = from ord in _context.SavedSearches where ord.UserId == search.userId && ord.SearchId==search.searchId select ord;
            Boolean res = false; ;
            foreach (SavedSearches ord in query)
            {
                if (ord.IsPublic)
                {
                    ord.IsPublic = false;
                }
                else
                {
                    ord.IsPublic = true;
                }
                res = ord.IsPublic;
            }
            try
            {
                _context.SaveChanges();
                return Ok(new { data = res });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return BadRequest();
            }
        }

        [HttpPost]
        [Route("addFilter")]
        public IActionResult AddFilter(SavedSearches filter)
        {
            try
            {
                ReportingContext context = new ReportingContext();
                context.SavedSearches.Add(new SavedSearches { UserId = filter.UserId, Field = filter.Field, Operator1 = filter.Operator1, Operator2 = filter.Operator2, Value1 = filter.Value1, Value2 = filter.Value2, IsPublic = filter.IsPublic, Searchname = filter.Searchname, Logic = filter.Logic });
                context.SaveChanges();

                //_context.SavedSearches.Add(new SavedSearches {UserId=filter.UserId, Field = filter.Field, Operator1 = filter.Operator1, Operator2 = filter.Operator2, Value1 = filter.Value1, Value2 = filter.Value2 });
                //_context.SaveChanges();
                return Ok("Success");
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

    }
}