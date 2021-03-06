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
        public string expiry_date { get; set; }
        public string production_date { get; set; }
        public int number_of_items { get; set; } = 12;
        public ProductTypesModel category { get; set; } = ProductTypesModel.chips;
        public String made_in { get; set; }
        public double width { get; set; }
        public double height { get; set; }
        public double length { get; set; }
        public Boolean active { get; set; }
    }
}
