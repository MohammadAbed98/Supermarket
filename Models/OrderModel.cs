
using Supemarket.Entities;
using Supemarket.Models;
using System.Collections.Generic;

namespace supemarket.models
{
    public class OrderModel
    {
        public double total { get; set; } = 0;
        public int[] products { get; set; }
        public string address { get; set; }
    }
  
}
