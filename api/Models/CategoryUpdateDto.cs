using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class CategoryUpdateDto
    {
        public IDictionary<string, string> Title { get; set; }

        public bool IsMenuItem { get; set; } = false;

        public IDictionary<string, string> Description { get; set; }

        public string Slug { get; set; }

        public int? ParentId { get; set; }
    }
}
