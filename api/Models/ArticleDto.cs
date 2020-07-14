using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class ArticleDto
    {
        public int Id { get; set; }

        public string Slug { get; set; }

        public IDictionary<string, string> Title { get; set; }

        public DateTime DateCreated { get; set; }

        public DateTime DatePublished { get; set; }

        public IDictionary<string, string> Summary { get; set; }

        public IDictionary<string, string> Introduction { get; set; }

        public IDictionary<string, string> Body { get; set; }

        public bool IsPublished { get; set; }

        public bool IsFeatured { get; set; }

        public bool IsMenuItem { get; set; }

        public int CategoryId { get; set; }

        public string CategoryName { get; set; }

        public ImageDto Picture { get; set; }

        public ICollection<ImageDto> Gallery { get; } = new List<ImageDto>();
    }
}
