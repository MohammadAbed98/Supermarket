using Microsoft.EntityFrameworkCore;
using Supemarket.Entities;
using System.Collections.Generic;

namespace Supemarket.Data

{
    public class ProductMicroservice : DbContext
    {
        public ProductMicroservice(DbContextOptions<ProductMicroservice> options) : base(options)
        {

        }
        //public ProductMicroservice() : base("name=ProductMicroservice")
        //{

        //}
        public DbSet<ProductEntity> Products { get; set; }

    }
}
