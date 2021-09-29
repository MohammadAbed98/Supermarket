using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Supemarket.Entities

{
    //[Table("Product")]
   
    public class Product
    {
        public int id { get; set; } = 0;
        public int? OrderId { get; set; } = 0;
        public Order order { get; set; }
        //[Required]
        public String name { get; set; } = "NULL";
        public double price { get; set; } = 0;
        public String parcode { get; set; } = "NULL";
        public DateTime startDate { get; set; } 
        public DateTime endtDate { get; set; }
        public int numberOfPecis { get; set; } = 12;
        public ProductTypes type { get; set; } = ProductTypes.chips;
    }
}
