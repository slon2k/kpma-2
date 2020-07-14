using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Entities
{
    public class Article
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Slug { get; set; }

        [Required]
        public IDictionary<string, string> Title { get; set; } = new Dictionary<string, string>();

        public DateTime DateCreated { get; set; } = DateTime.Now;

        public DateTime DatePublished { get; set; } = DateTime.Now;

        public IDictionary<string, string> Summary { get; set; } = new Dictionary<string, string>();

        public IDictionary<string, string> Introduction { get; set; } = new Dictionary<string, string>();

        public IDictionary<string, string> Body { get; set; } = new Dictionary<string, string>();

        public bool IsPublished { get; set; }

        public bool IsFeatured { get; set; }

        public bool IsMenuItem { get; set; }

        public int CategoryId { get; set; }

        [ForeignKey("CategoryId")]
        public virtual Category Category { get; set; }

        public Image Picture { get => Images.FirstOrDefault(i => i.IsMain); }

        public virtual ICollection<Image> Images { get; } = new List<Image>();
    }
}
