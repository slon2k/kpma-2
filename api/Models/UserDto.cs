﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class UserDto
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public ICollection<string> Roles { get; } = new List<string>();
    }
}
