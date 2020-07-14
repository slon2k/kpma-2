using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Entities;
using api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MenuController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private IList<Category> Categories { get; } = new List<Category>();
        private IList<Article> Articles { get; } = new List<Article>();

        public MenuController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MenuItem>>> GetMenuItems()
        {
            var categories = await _context.Categories.Where(c => c.IsMenuItem).ToListAsync().ConfigureAwait(false);
            foreach (var item in categories)
            {
                Categories.Add(item);
            }
            var articles = await _context.Articles.Where(a => a.IsPublished && a.IsMenuItem).Include(a => a.Category).ToListAsync().ConfigureAwait(false);
            foreach (var item in articles)
            {
                Articles.Add(item);
            }
            return Ok(CreateMenuItems(null));
        }

        private IEnumerable<MenuItem> CreateMenuItems(int? parentId)
        {
            var menuItems = new List<MenuItem>(); 
            var filteredCategories = Categories.Where(c => c.ParentId == parentId || (c.ParentId == null && parentId == null));
            var filteredArticles = Articles.Where(a => a.CategoryId == parentId);

            foreach (var category in filteredCategories)
            {
                var menuItem = new MenuItem { Path = "/" + category.Slug, Title = category.Title };
                var subItems = CreateMenuItems(category.Id);
                foreach (var item in subItems)
                {
                    menuItem.SubItems.Add(item);
                }
                menuItems.Add(menuItem);
            }

            foreach (var article in filteredArticles)
            {
                var menuItem = new MenuItem { Path = "/" + article.Category.Slug + "/" + article.Slug, Title = article.Title };
                menuItems.Add(menuItem);
            }

            return menuItems;
        }
    }


}