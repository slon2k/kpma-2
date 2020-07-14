using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Data;
using api.Entities;
using AutoMapper;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace api.Controllers
{
    [Route("api/articles/{articleId}/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator,Editor")]
    public class ImagesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public ImagesController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/articles/1/Images
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<ImageDto>>> GetImages([FromRoute] int articleId)
        {
            if (!ArticleExists(articleId))
            {
                return NotFound();
            }

            var images = await _context.Images.Where(i => i.ArticleId == articleId).ToListAsync().ConfigureAwait(false);
            
            return _mapper.Map<List<ImageDto>>(images);
        }

        // GET: api/articles/1/Images/5
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<ImageDto>> GetImage(int articleId, int id)
        {
            if (!ArticleExists(articleId))
            {
                return NotFound();
            }

            var image = await _context.Images.FindAsync(id);

            if (image == null)
            {
                return NotFound();
            }

            if (image.ArticleId != articleId)
            {
                return BadRequest();
            }

            return _mapper.Map<ImageDto>(image);
        }

        // PUT: api/articles/1/Images/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutImage(int articleId, int id, [FromBody] ImageUpdateDto imageUpdateDto)
        {
            var article = await _context.Articles.FindAsync(articleId);
            
            if (article == null)
            {
                return NotFound();
            }

            var image = await _context.Images.FindAsync(id);

            if (image == null)
            {
                return NotFound();
            }

            if (image.ArticleId != articleId)
            {
                return BadRequest();
            }

            _mapper.Map(imageUpdateDto, image);

            if (image.IsMain)
            {
                var mainImage = _context.Images.FirstOrDefault(i => i.ArticleId == articleId && i.IsMain && i.Id != id);

                if (mainImage != null)
                {
                    mainImage.IsMain = false;
                }
            }
            
            try
            {
                await _context.SaveChangesAsync().ConfigureAwait(false);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ImageExists(id))
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

        // POST: api/articles/1/Images
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<ImageDto>> PostImage(int articleId, ImageCreateDto imageCreateDto)
        {
            var article = await _context.Articles.FindAsync(articleId);

            if (article == null)
            {
                return NotFound();
            }

            var image = new Image { ArticleId = articleId };

            _mapper.Map(imageCreateDto, image);

            _context.Images.Add(image);

            if (image.IsMain)
            {
                var mainImage = _context.Images.FirstOrDefault(i => i.ArticleId == articleId && i.IsMain && i.Id != image.Id);

                if (mainImage != null)
                {
                    mainImage.IsMain = false;
                }
            }

            await _context.SaveChangesAsync().ConfigureAwait(false);

            return CreatedAtAction("GetImage", new { articleId = image.ArticleId, id = image.Id }, _mapper.Map<ImageDto>(image));
        }

        // DELETE: api/articles/1/Images/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ImageDto>> DeleteImage(int articleId, int id)
        {
            if (!ArticleExists(articleId))
            {
                return NotFound();
            }

            var image = await _context.Images.FindAsync(id);
            
            if (image == null)
            {
                return NotFound();
            }

            if (image.IsMain)
            {
                return BadRequest("Main image should not be deleted!");
            }

            _context.Images.Remove(image);

            await _context.SaveChangesAsync().ConfigureAwait(false);

            return _mapper.Map<ImageDto>(image);
        }

        private bool ImageExists(int id)
        {
            return _context.Images.Any(e => e.Id == id);
        }

        private bool ArticleExists(int id)
        {
            return _context.Articles.Any(e => e.Id == id);
        }
    }
}
