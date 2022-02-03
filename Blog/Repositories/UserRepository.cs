using Blog.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Blog.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly UserContext context;
        public UserRepository(UserContext context)
        {
            this.context = context;
        }
        public User Create(User user)
        {
            context.Users.Add(user);
            context.SaveChanges();
            return user;
        }
        public User GetByEmail(string email)
        {
            return context.Users.FirstOrDefault(x=>x.Email == email);
        }
        public User GetById(string id)
        {
            return context.Users.FirstOrDefault(x => x.Id == id);
        }

        public User GetByName(string name)
        {
            return context.Users.FirstOrDefault(x => x.UserName == name);
        }
    }
}
