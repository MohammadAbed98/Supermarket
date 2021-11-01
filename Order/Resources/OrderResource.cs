using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Order.Resources
{
    public class OrderResource
    {
        public int id { get; set; }
        public double total { get; set; } = 0;
        public String address { get; set; }
        public String listOfProducts { get; set; }
        public List<ProductResource> products { get; set; }
    }
}
