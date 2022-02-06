using Blog.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Blog.Repositories
{
    public interface IArticleRepository
    {
        Article Create(Article article);
        IEnumerable<Article> GetAll();
    }
}
