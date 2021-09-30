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
        public String parcode { get; set; } = "NULL";
        public DateTime startDate { get; set; } 
        public DateTime endtDate { get; set; }
        public int numberOfPecis { get; set; }
        public ProductTypes type { get; set; } = ProductTypes.chips;
        public List<Order> Orders { get; set; }
        public List<OrderProduct> OrderProduct { get; set; }

    }
}
