using api.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Data
{
    public class ApplicationDbContext : IdentityDbContext<User>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Category> Categories { get; set; }
        public DbSet<Article> Articles { get; set; }
        public DbSet<Image> Images { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            if (modelBuilder == null)
            {
                throw new ArgumentNullException(nameof(modelBuilder));
            }

            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Category>()
                .Property(c => c.Description)
                .HasConversion(d => JsonConvert.SerializeObject(d), d => JsonConvert.DeserializeObject<Dictionary<string, string>>(d));

            modelBuilder.Entity<Category>()
                .Property(c => c.Title)
                .HasConversion(d => JsonConvert.SerializeObject(d), d => JsonConvert.DeserializeObject<Dictionary<string, string>>(d)); 
            
            modelBuilder.Entity<Article>()
                .Property(a => a.Title)
                .HasConversion(d => JsonConvert.SerializeObject(d), d => JsonConvert.DeserializeObject<Dictionary<string, string>>(d));

            modelBuilder.Entity<Article>()
                .Property(a => a.Introduction)
                .HasConversion(d => JsonConvert.SerializeObject(d), d => JsonConvert.DeserializeObject<Dictionary<string, string>>(d));
            
            modelBuilder.Entity<Article>()
                .Property(a => a.Summary)
                .HasConversion(d => JsonConvert.SerializeObject(d), d => JsonConvert.DeserializeObject<Dictionary<string, string>>(d));

            modelBuilder.Entity<Article>()
                .Property(a => a.Body)
                .HasConversion(d => JsonConvert.SerializeObject(d), d => JsonConvert.DeserializeObject<Dictionary<string, string>>(d));

        }
    }
}
