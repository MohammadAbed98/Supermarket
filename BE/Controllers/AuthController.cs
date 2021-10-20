using Microsoft.AspNetCore.Mvc;
using Supemarket.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Supemarket.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController
    {
        [HttpPost]
        [Route("login/{email}/{password}")]
        public User login(string email , string password)
        {
            User u = new User();
            u.password = "test";
            u.userName = "test@appia.com";
            return u;
        }

        //[HttpGet]
        //[Route("login/{email}/{password}")]
        //public Boolean login(string email, string password)
        //{
        //    return true;
        //}
    }
}
