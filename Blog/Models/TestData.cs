using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Blog.Models
{
    public class TestData
    {
        public static void Initialize(UserContext context)
        {
            if (!context.Users.Any())
            {
                context.Users.AddRange(
                    new User
                    {
                        UserName = "Test0",
                        Email = "i.dobrovolskiy101@gmail.com"
                    },
                    new User
                    {
                        UserName = "Test1",
                        Email = "i.dobrovolskiy102@gmail.com"
                    },
                    new User
                    {
                        UserName = "Test2",
                        Email = "i.dobrovolskiy103@gmail.com"
                    },
                    new User
                    {
                        UserName = "Test3",
                        Email = "i.dobrovolskiy104@gmail.com"
                    },
                    new User
                    {
                        UserName = "Test4",
                        Email = "i.dobrovolskiy105@gmail.com"
                    });
                context.SaveChanges();
            }
        }
    }
}
