using Blog.Config;
using Blog.Models;
using Blog.Models.DTO;
using Blog.Repositories;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Blog.Controllers.Api
{
    //public class NewArticle
    //{
    //    public string title { get; set; }
    //    public string body { get; set; }
    //}



    [ApiController]
    [Route("api/[controller]/[action]")]
    public class ArticleController : Controller
    {
        private readonly IUserRepository userRepository;
        private readonly IArticleRepository articleRepository;

        public ArticleController(IUserRepository userRepository, IArticleRepository articleRepository)
        {
            this.userRepository = userRepository;
            this.articleRepository = articleRepository;

        }

        [HttpPost]
        public IActionResult Create(CreateArticleModel createArticle)
        {
            AuthOptions authOptions = new AuthOptions();
            var result = authOptions.Verify(createArticle.JWT);
            //добавить условия и обернуть в try - catch
            var user = userRepository.GetById(result.Issuer);

            if (user != null)
            {
                Article article = new Article
                {
                    Title = createArticle.Title,
                    Body = createArticle.SomeText,
                    Date = DateTime.Now,
                    UserId = user.Id,
                    UserName = user.UserName,
                    User = user
                };
                var info = articleRepository.Create(article);

                return Json(new
                {
                    result = "success"
                });

                //return Json(new
                //{
                //    access_token = checkToken.JWT,
                //    user_name = user.UserName
                //});
            }
            return BadRequest(new { error = "The token isn't correct" });
        }

        [HttpGet]
        public IActionResult GetArticles()
        {
            return Json(new
            {
                articles = articleRepository.GetAll()
            });
        }
    }
}
