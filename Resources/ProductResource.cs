using supemarket.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Supemarket.Resources
{
    public class ProductResource
    {
        public int Id { get; set; }
        public String name { get; set; } = "NULL";
        public double price { get; set; } = 0;
        public String parcode { get; set; } = "NULL";
        public DateTime startDate { get; set; }
        public DateTime endtDate { get; set; }
        public int numberOfPecis { get; set; } = 12;
        public ProductTypesModel type { get; set; } = ProductTypesModel.chips;
    }
}
