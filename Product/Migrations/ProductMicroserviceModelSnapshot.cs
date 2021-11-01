﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Supemarket.Data;

namespace Product.Migrations
{
    [DbContext(typeof(ProductMicroservice))]
    partial class ProductMicroserviceModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.10")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Supemarket.Entities.ProductEntity", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("active")
                        .HasColumnType("bit");

                    b.Property<int>("category")
                        .HasColumnType("int");

                    b.Property<string>("expiry_date")
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("height")
                        .HasColumnType("float");

                    b.Property<double>("length")
                        .HasColumnType("float");

                    b.Property<string>("made_in")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("number_of_items")
                        .HasColumnType("int");

                    b.Property<double>("price")
                        .HasColumnType("float");

                    b.Property<string>("production_date")
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("width")
                        .HasColumnType("float");

                    b.HasKey("id");

                    b.ToTable("Products");
                });
#pragma warning restore 612, 618
        }
    }
}