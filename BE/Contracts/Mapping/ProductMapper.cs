using Supemarket.Entities;
using Supemarket.Models;
using Supemarket.Resources;
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
            p.number_of_items = producModel.number_of_items;
            //p.parcode = producModel.parcode;
            p.price = producModel.price;
            p.production_date = producModel.expiry_date;
            p.expiry_date = producModel.production_date;
            p.height = producModel.height;
            p.width = producModel.width;
            p.length = producModel.length;
            p.made_in = producModel.made_in;
            p.active = producModel.active;
            //p.category = producModel.category;

            return p;
        }

        public static ProductResource MapProductEntityToResource(this Product product)
        {

            ProductResource pR = new ProductResource();
            pR.Id = product.id;
            pR.name = product.name;
            pR.price = product.price;
            //pR.parcode = product.parcode;
            pR.number_of_items = product.number_of_items;
            pR.production_date = product.production_date;
            pR.expiry_date = product.expiry_date;
            pR.height = product.height;
            pR.width = product.width;
            pR.length = product.length;
            pR.made_in = product.made_in;
            pR.active = product.active;
            return pR;
        }




    }
}
