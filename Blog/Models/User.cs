using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Blog.Models
{
    public class User : IdentityUser
    {
        public virtual ICollection<Article> Articles { get; set; }
        public virtual ICollection<UserSubscribe> UserSubscribes { get; set; }
        public User()
        {
            UserSubscribes = new HashSet<UserSubscribe>();
            Articles = new HashSet<Article>();
        }
    }
}
