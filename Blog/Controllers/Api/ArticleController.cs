using Blog.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Blog.Controllers.Api
{
    public class NewArticle
    {
        public string title { get; set; }
        public string body { get; set; }
    }



    [ApiController]
    [Route("api/[controller]/[action]")]
    public class ArticleController : Controller
    {
        UserContext context;


        [HttpPost]
        public async Task<IActionResult> Create(NewArticle newArticle)
        {
            string x = newArticle.body;
            string y = newArticle.title;


            context.Articles.Add(new Article
            {

            });


            try
            {
               
                return BadRequest(new { error = "Something went wrong. Please try again later" });
            }
            catch
            {
                return BadRequest(new { error = "Something went wrong. Please try again later" });
            }
        }
    }
}
