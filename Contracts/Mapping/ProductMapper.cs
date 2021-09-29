using Supemarket.Entities;
using Supemarket.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Supemarket.Contracts.Mapping
{
    public static class ProductMapper
    {
        public static Product MapProductModelToEntity( this ProductModel producModel )
        {
            Product p = new Product();
            p.name = producModel.name;
            p.numberOfPecis = producModel.numberOfPecis;
            p.parcode = producModel.parcode;
            p.price = producModel.price;
            p.startDate = producModel.startDate;
            p.endtDate = producModel.endtDate;
            
            return p;
        }
    }
}
