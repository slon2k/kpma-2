using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class ImageCreateDto
    {
        public string ImageName { get; set; }
        public string ImagePath { get; set; }
        public string AltText { get; set; }
        public string Caption { get; set; }
        public bool IsMain { get; set; } = false;
    }
}
