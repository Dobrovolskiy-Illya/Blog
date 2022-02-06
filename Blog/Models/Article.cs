using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Blog.Models
{
    public class Article
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }
        public string Picture { get; set; }
        public DateTime Date { get; set; }
        public string UserId { get; set; }
        public string UserName { get; set; }
        public virtual User User { get; set; }
    }
}
