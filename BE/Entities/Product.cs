using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Supemarket.Entities

{
    //[Table("Product")]
   
    public class Product
    { 
        //[Key]
        //[Column(Order = 1)]
        public int id { get; set; }
        //[Key]
        //[Column(Order = 2)]
        //[ForeignKey("Order")]: same name of public Order Order { get; set; }
        //public int OrderId { get; set; } = 0; // ? meaning: Nullable
        //[Required] >> Meaning: Nullable
        //[Column("Name")]
        //[MaxLength(255)]
        public String name { get; set; } = "NULL";
        public double price { get; set; } = 0;
        //[Index(IsUnique = true)]
        public string production_date { get; set; }
        public string expiry_date { get; set; }
        public int number_of_items { get; set; }
        public ProductTypes category { get; set; } = ProductTypes.chips;
        public String made_in { get; set; }
        //public String parcode { get; set; } = "NULL";
        public double width { get; set; }
        public double height { get; set; }
        public double length { get; set; }
        public Boolean active { get; set; }
        public List<Order> Orders { get; set; }
        public List<OrderProduct> OrderProduct { get; set; }


    }
}
