using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Blog.Models
{
    public class UserSubscribe
    {
        public int UserId { get; set; }
        public ICollection<User> Users { get; set; }
    }
}
