using Microsoft.EntityFrameworkCore;
using Supemarket.Entities;

namespace Supemarket.Data

{
    public class SupermarketDbContext : DbContext 
    {
        public SupermarketDbContext(DbContextOptions<SupermarketDbContext> options): base(options)
        {
                
        }
        public DbSet<Product> Products { get; set; }
        public DbSet<Order> Orders { get; set; }
    }
}
