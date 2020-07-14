using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class CategoryCreateDto
    {
        [Required]
        public IDictionary<string, string> Title { get; set; }

        public bool IsMenuItem { get; set; } = false;

        public IDictionary<string, string> Description { get; set; } 

        [Required]
        public string Slug { get; set; }

        public int? ParentId { get; set; }
    }
}
