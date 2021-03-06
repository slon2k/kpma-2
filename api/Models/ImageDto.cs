﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class ImageDto
    {
        public int Id { get; set; }
        public string ImageName { get; set; }
        public string ImagePath { get; set; }
        public string AltText { get; set; }
        public string Caption { get; set; }
        public bool IsMain { get; set; }
        public int ArticleId { get; set; }
        public string FullName
        {
            get => ImagePath + "/" + ImageName;
        }  
    }
}
