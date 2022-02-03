using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Blog.Models.DTO
{
    public class CreateArticleModel: JWT
    {
        public string Title { get; set; }
        public string SomeText { get; set; }
        //public string Avatar { get; set; }
    }
}
