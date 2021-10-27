using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Supemarket.Entities
{
    public class OrderProduct
    {
        public DateTime CreatedAt { get; set; }

        public int OrderId { get; set; }
        public Order Order { get; set; }

        public int ProductId { get; set; }
        public ProductEntity Product { get; set; }
    }
}
