using Microsoft.EntityFrameworkCore;
using Supemarket.Entities;
using System.Collections.Generic;

namespace Supemarket.Data

{
    public class SupermarketDbContext : DbContext 
    {
        public SupermarketDbContext(DbContextOptions<SupermarketDbContext> options) : base(options)
        {

        }
        //public SupermarketDbContext() : base("name=SupermarketDbContext")
        //{

        //}
        public DbSet<ProductEntity> Products { get; set; }
        public DbSet<Order> Orders { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Table and schema names
            //modelBuilder.Entity<Product>()
            //   .ToTable("tableName" , "SchemaName");

            // ForeignKey 
            //modelBuilder.Entity<Product>()
            //    .HasKey( t => t.OrderId); 

            // ComposetKey:
            //modelBuilder.Entity<Product>()
            //    .HasKey(t => new { t.OrderId, t.Order });

            //Properties:
            //ColumnName:
            //modelBuilder.Entity<Product>()
            //    .Property(t => t.name)
            //    .HasColumnName("Columnname");
            //ColumnType:
            //modelBuilder.Entity<Product>()
            //    .Property(t => t.name)
            //    .HasColumnType("ColumnType");
            //ColumnOrder:
            //modelBuilder.Entity<Product>()
            //    .Property(t => t.name)
            //    .HasColumnOrder(1);
            //etc..

            modelBuilder.Entity<ProductEntity>()
                .Property(c => c.name)
                .IsRequired()
                .HasMaxLength(255);

            modelBuilder.Entity<Order>() 
                    .Property(c => c.address)
                    .IsRequired()
                    .HasMaxLength(255);
            // Many-To-Many Realtion between Order and Product:
            //modelBuilder.Entity<Order>()
            //    .HasMany(p => p.products)
            //    .WithMany(c => c.Orders)
            //    .Map(m => m.ToTable("ProductsOrder"));

            // Many-To-Many
            //modelBuilder.Entity<Order>()
            //    .HasMany(p => p.products)
            //    .WithMany(p => p.Orders)
            //    .UsingEntity<Dictionary<string, object>>(
            //    "OrderProduct",
            //    j => j
            //        .HasOne<Product>()
            //        .WithMany()
            //        .HasForeignKey("ProductId")
            //        .HasConstraintName("FK_OrderProduct_Product_ProductId")
            //        .OnDelete(DeleteBehavior.Cascade),
            //    j => j
            //        .HasOne<Order>()
            //        .WithMany()
            //        .HasForeignKey("OrderId")
            //        .HasConstraintName("FK_OrderProduct_Orders_OrderId")
            //        .OnDelete(DeleteBehavior.ClientCascade));
            //    modelBuilder.Entity<Product>()
            //        .Property(t => t.OrderId)
            //        .IsRequired();

            modelBuilder.Entity<Order>()
              .HasMany(c => c.products)
              .WithMany(c => c.Orders)
              .UsingEntity<OrderProduct>(
                  j => j
                      .HasOne(op => op.Product)
                      .WithMany(s => s.OrderProduct)
                      .HasForeignKey(cs => cs.ProductId),
                  j => j
                      .HasOne(op => op.Order)
                      .WithMany(c => c.OrderProduct)
                      .HasForeignKey(cs => cs.OrderId),
                  j =>
                  {
                      j.Property(pt => pt.CreatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");
                      j.HasKey(t => new { t.OrderId, t.ProductId });
                  });
        }
    }
}
