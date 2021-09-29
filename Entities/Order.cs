﻿using Supemarket.Contracts.LightResources;
using Supemarket.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Supemarket.Entities
{
    public class Order
    {
        public int id { get; set; }
        public double total { get; set; } = 0;
        public List<Product> products { get; set; }
        public String address { get; set; }
    }
}
