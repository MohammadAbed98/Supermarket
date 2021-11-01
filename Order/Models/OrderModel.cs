
using Order.Entities;
using Order.Models;
using System.Collections.Generic;

namespace order.models
{
    public class OrderModel
    {
        public double total { get; set; } = 0;
        public int[] products { get; set; }
        public string address { get; set; }
    }
  
}
