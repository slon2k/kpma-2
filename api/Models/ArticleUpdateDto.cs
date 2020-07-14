using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class ArticleUpdateDto
    {
        public string Slug { get; set; }

        public IDictionary<string, string> Title { get; set; }

        public DateTime DatePublished { get; set; }

        public IDictionary<string, string> Summary { get; set; }

        public IDictionary<string, string> Introduction { get; set; }

        public IDictionary<string, string> Body { get; set; }

        public bool IsPublished { get; set; } = false;

        public bool IsFeatured { get; set; } = false;

        public bool IsMenuItem { get; set; } = false;

        public int CategoryId { get; set; }

        public ICollection<ImageUpdateDto> Images { get; }
    }
}
