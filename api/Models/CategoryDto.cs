using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class CategoryDto
    {
        public int Id { get; set; }

        public IDictionary<string, string> Title { get; set; }

        public IDictionary<string, string> Description { get; set; }

        public bool IsMenuItem { get; set; }

        public string Slug { get; set; }

        public int? ParentId { get; set; }

    }
}
