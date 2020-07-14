using api.Entities;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Data
{
    public static class Seed
    {
        public static async Task SeedData(ApplicationDbContext context, UserManager<User> userManager, RoleManager<IdentityRole> roleManager)
        {
            if (context == null)
            {
                throw new ArgumentNullException(nameof(context));
            }

            if (userManager == null)
            {
                throw new ArgumentNullException(nameof(userManager));
            }

            if (roleManager == null)
            {
                throw new ArgumentNullException(nameof(roleManager));
            }

            //Seed Users
            if (!userManager.Users.Any())
            {
                var users = new List<User>()
                {
                    new User()
                    {
                        Id = "9263df7b-17d7-480c-bc3e-309561522ab0",
                        UserName = "Admin",
                        Email = "admin@kpma.kz"
                    },
                    new User()
                    {
                        Id = "2251d770-a707-4335-a7d7-8677356043fd",
                        UserName = "Editor",
                        Email = "editor@kpma.kz"
                    }
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd").ConfigureAwait(false);
                }
            }

            //Seed Roles
            if (!roleManager.Roles.Any())
            {
                var roles = new List<IdentityRole>()
                {
                    new IdentityRole()
                    {
                        Id = "cc8e8487-9111-4176-a0e2-a9e5807caf99",
                        Name = "Administrator"
                    },
                    new IdentityRole()
                    {
                        Id = "423545fa-e843-4751-a52a-7d82493e9c38",
                        Name = "Editor"
                    },
                    new IdentityRole()
                    {
                        Id = "b659e685-e4e8-46ee-ae15-bf9d24bcfa4a",
                        Name = "User"
                    }
                };

                foreach (var role in roles)
                {
                    await roleManager.CreateAsync(role).ConfigureAwait(false);
                }
            }

            var admin = await userManager.FindByNameAsync("Admin").ConfigureAwait(false);
            var adminRole = await roleManager.FindByNameAsync("Administrator").ConfigureAwait(false);

            if (admin != null && adminRole != null)
            {
                var isInAminRole = await userManager.IsInRoleAsync(admin, "Administrator").ConfigureAwait(false);
                if (!isInAminRole)
                {
                    await userManager.AddToRoleAsync(admin, adminRole.Name).ConfigureAwait(false);
                }
            }

            //Seed Categories
            if (!context.Categories.Any())
            {
                var news = new Category()
                {
                    Slug = "news",
                    IsMenuItem = true,
                    Parent = null
                };

                news.Title.Add("ru", "Новости");
                news.Title.Add("en", "News");
                
                var events = new Category()
                {
                    Slug = "events",
                    IsMenuItem = true,
                    Parent = null
                };

                events.Title.Add("ru", "События");
                events.Title.Add("en", "Events");

                var courses = new Category()
                {
                    Slug = "courses",
                    IsMenuItem = true,
                    Parent = null
                };

                courses.Title.Add("ru", "Курсы");
                courses.Title.Add("en", "Courses");

                var certification = new Category()
                {
                    Slug = "certification",
                    IsMenuItem = true,
                    Parent = null
                };

                certification.Title.Add("ru", "Сертификация");
                certification.Title.Add("en", "Certification");

                var about = new Category()
                {
                    Slug = "about",
                    IsMenuItem = true,
                    Parent = null
                };

                about.Title.Add("ru", "О нас");
                about.Title.Add("en", "About");

                var categories = new List<Category>()
                {
                    news, events, courses, certification, about
                };

                await context.Categories.AddRangeAsync(categories).ConfigureAwait(false);

                await context.SaveChangesAsync().ConfigureAwait(false);
            }

            if (!context.Articles.Any())
            {
                var categories = context.Categories.ToList();
                var articles = new List<Article>();
                foreach (var category in categories)
                {
                    for (int i = 0; i < 5; i++)
                    {
                        var title = new Dictionary<string, string>();
                        title.Add("ru", "Заголовок - " + i);
                        title.Add("en", "Title - " + i);

                        var body = new Dictionary<string, string>();
                        title.Add("ru", "Статья - " + i);
                        title.Add("en", "Article - " + i);

                        articles.Add(new Article
                        {
                            Title = title,
                            Category = category,
                            IsFeatured = i < 2,
                            Slug = "article-" + i + "-" + category.Slug,
                            IsPublished = true,
                            Body = body,
                            Introduction = body,
                            Summary = body,
                            IsMenuItem = category.Slug == "about"
                        });
                    }
                }

                await context.Articles.AddRangeAsync(articles).ConfigureAwait(false);

                await context.SaveChangesAsync().ConfigureAwait(false);

            }

            var articlesForImage = context.Articles.ToList();
            var images = context.Images.ToList();
            foreach (var article in articlesForImage)
            {
                if (article.Picture == null)
                {
                    images.Add(new Image
                    {
                        ImageName = "300.png",
                        ImagePath = "https://via.placeholder.com",
                        AltText = "Image",
                        IsMain = true,
                        Article = article
                    });
                }
            }

            await context.Images.AddRangeAsync(images).ConfigureAwait(false);

            await context.SaveChangesAsync().ConfigureAwait(false);
        }
    }
}
