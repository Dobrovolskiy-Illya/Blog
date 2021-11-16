using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Blog.Models
{
    public class User : IdentityUser
    {
        public ICollection<Article> Articles { get; set; }
        public ICollection<UserSubscribe> UserSubscribes { get; set; }
    }
}
