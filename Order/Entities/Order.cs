using System;
using System.Collections.Generic;

namespace Order.Entities
{
    public class OrderEntity
    {
        public int id { get; set; }
        public double total { get; set; } = 0;
        public String address { get; set; }
        public String listOfProducts { get; set; }
        public List<ProductEntity> products { get; set; }
        public List<OrderProduct> OrderProduct { get; set; }

    }
}
