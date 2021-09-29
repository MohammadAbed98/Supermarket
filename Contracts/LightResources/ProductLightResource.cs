using Microsoft.EntityFrameworkCore;
using Supemarket.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Supemarket.Contracts.LightResources
{
    [Keyless]

    public class ProductLightResource
    {
        public String name { get; set; } = "NULL";
        public double price { get; set; } = 0;
        public String parcode { get; set; } = "NULL";
        public DateTime startDate { get; set; }
        public DateTime endtDate { get; set; }
        public int numberOfPecis { get; set; } = 12;
        public ProductTypes type { get; set; } = ProductTypes.chips;
    }
}
