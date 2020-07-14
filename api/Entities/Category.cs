using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Entities
{
    public class Category
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public IDictionary<string, string> Title { get; set; } = new Dictionary<string, string>();

        public IDictionary<string, string> Description { get; set; }

        public bool IsMenuItem { get; set; }
        
        [Required]
        public string Slug { get; set; }
        
        public int? ParentId { get; set; }
        
        [ForeignKey("ParentId")]
        public virtual Category Parent { get; set; }

        public virtual ICollection<Category> SubCategories { get; } = new List<Category>();
    }
}
