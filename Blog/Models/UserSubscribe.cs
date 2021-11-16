using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Blog.Models
{
    public class UserSubscribe
    {
        public int UserSubscribeId { get; set; }
        public int? UserId { get; set; }

        public virtual User User { get; set; }
        //public virtual ICollection<User> Users { get; set; }
        //public UserSubscribe()
        //{
        //    Users = new HashSet<User>();
        //}
    }
}
