using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class MenuItem
    {
        public IDictionary<string, string> Title { get; set; }
        public string Path { get; set; }
        public ICollection<MenuItem> SubItems { get; } = new List<MenuItem>();
    }
}
