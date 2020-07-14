using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Data;
using api.Entities;
using api.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator,Editor")]
    public class ArticlesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public ArticlesController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Articles
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<ArticleDto>>> GetArticles()
        {
            var articles = await _context.Articles.Include(a => a.Category).Include(a => a.Images).ToListAsync().ConfigureAwait(false);
            
            return _mapper.Map<List<ArticleDto>>(articles);
        }

        // GET: api/Articles/5
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<ArticleDto>> GetArticle(int id)
        {
            var article = await _context.Articles.Include(a => a.Category).Include(a => a.Images).FirstOrDefaultAsync(a => a.Id == id).ConfigureAwait(false);

            if (article == null)
            {
                return NotFound();
            }

            return _mapper.Map<ArticleDto>(article);
        }

        // PUT: api/Articles/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutArticle(int id, ArticleUpdateDto articleUpdateDto)
        {
            var article = await _context.Articles.FindAsync(id);

            if (article == null)
            {
                return NotFound();
            }

            _context.Entry(article).State = EntityState.Modified;

            _mapper.Map(articleUpdateDto, article);

            try
            {
                await _context.SaveChangesAsync().ConfigureAwait(false);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ArticleExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Articles
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<ArticleDto>> PostArticle(ArticleCreateDto articleCreateDto)
        {
            if (articleCreateDto == null)
            {
                return BadRequest();
            }
            
            var article = new Article();

            if (articleCreateDto.Picture == null)
            {
                articleCreateDto.Picture = new ImageCreateDto() 
                { 
                    IsMain = true, 
                    ImageName = "placeholder.png", 
                    ImagePath = "img", 
                    AltText = "img", 
                    Caption = "" 
                };
            }

            _mapper.Map(articleCreateDto, article);
            
            _context.Articles.Add(article);
            
            await _context.SaveChangesAsync().ConfigureAwait(false);

            return CreatedAtAction("GetArticle", new { id = article.Id }, _mapper.Map<ArticleDto>(article));
        }

        // DELETE: api/Articles/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ArticleDto>> DeleteArticle(int id)
        {
            var article = await _context.Articles.FindAsync(id);
            
            if (article == null)
            {
                return NotFound();
            }

            _context.Articles.Remove(article);
            
            await _context.SaveChangesAsync().ConfigureAwait(false);

            return _mapper.Map<ArticleDto>(article);
        }

        private bool ArticleExists(int id)
        {
            return _context.Articles.Any(e => e.Id == id);
        }
    }
}
