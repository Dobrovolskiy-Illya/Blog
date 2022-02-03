using Blog.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Blog.Repositories
{
    public class ArticleRepository: IArticleRepository
    {
        private readonly UserContext context;
        public ArticleRepository(UserContext context)
        {
            this.context = context;
        }
        public Article Create(Article article)
        {
            context.Articles.Add(article);
            context.SaveChanges();
            return article;
        }
    }
}
