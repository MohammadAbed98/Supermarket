using supemarket.models;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace Supemarket.Models
{
    [Table("Product")]
    public class ProductModel
    {
        //[Required]
        public String name { get; set; } = "NULL";
        public double price { get; set; } = 0;
        public String parcode { get; set; } = "NULL";
        public DateTime startDate { get; set; }
        public DateTime endtDate { get; set; }
        public int numberOfPecis { get; set; } = 12;
        public ProductTypesModel type { get; set; } = ProductTypesModel.chips;
        public object ProductMapper { get; internal set; }
    }
}
