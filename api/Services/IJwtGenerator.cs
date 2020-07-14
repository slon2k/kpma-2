using api.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Services
{
    public interface IJwtGenerator
    {
        string CreateToken(User user, IList<string> roles);
    }
}
