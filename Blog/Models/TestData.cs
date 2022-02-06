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
            //if (!context.Users.Any())
            //{
            //    context.Users.AddRange(
            //        //new User
            //        //{
            //        //    UserName = "Test0",
            //        //    Email = "i.dobrovolskiy101@gmail.com"
            //        //},
            //        //new User
            //        //{
            //        //    UserName = "Test1",
            //        //    Email = "i.dobrovolskiy102@gmail.com"
            //        //},
            //        //new User
            //        //{
            //        //    UserName = "Test2",
            //        //    Email = "i.dobrovolskiy103@gmail.com"
            //        //},
            //        //new User
            //        //{
            //        //    UserName = "Test3",
            //        //    Email = "i.dobrovolskiy104@gmail.com"
            //        //},
            //        new User
            //        {
            //            UserName = "Test4",
            //            Email = "i.dobrovolskiy105@gmail.com"
            //        });
            //    context.SaveChanges();
            //}






            //User user1 = new User
            //{
            //    UserName = "Vanya",
            //    NormalizedUserName = "VANYA",
            //    PasswordHash = "123",
            //};
            //User user2 = new User
            //{
            //    UserName = "Jason",
            //    NormalizedUserName = "JASON",
            //};
            //if (!context.Users.Any())
            //{
            //    context.Users.Add(user1);
            //    context.Users.Add(user2);
            //}
            //context.SaveChanges();

            //Article article1 = new Article { Title = "Hello Vanya", User = user1 };
            //Article article2 = new Article { Title = "Hello Jason", User = user2 };
            //if (!context.Articles.Any())
            //{
            //    context.Articles.Add(article1);
            //    context.Articles.Add(article2);
            //}
            //context.SaveChanges();

            //UserSubscribe subscriber1 = new UserSubscribe { User = user1 };
            //if (!context.UserSubscribes.Any())
            //{
            //    context.UserSubscribes.Add(subscriber1);
            //}
            //context.SaveChanges();
        }
    }
}
