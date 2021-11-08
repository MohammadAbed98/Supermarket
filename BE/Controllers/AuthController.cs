using Microsoft.AspNetCore.Mvc;
using Supemarket.Models;

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

    }
}
