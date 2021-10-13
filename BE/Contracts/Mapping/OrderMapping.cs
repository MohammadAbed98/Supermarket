
using supemarket.models;
using Supemarket.Entities;
using Supemarket.Repositories.Orders;
using Supemarket.Resources;
using System.Collections.Generic;
using System.Linq;
using Supemarket.Contracts.Mapping;



namespace Supemarket.Contracts.Mapping
{
    public static class OrderMapping
    { 

        public static Order MapOrderModelToEntity(  this OrderModel orderModel , Order o)
        {
            o.address = orderModel.address;
            o.total = orderModel.total;
            return o;
        }
        public static OrderResource MapOrderEntitytoResource(this Order o)
        {
            OrderResource oR = new OrderResource();
            oR.id = o.id;
            oR.listOfProducts = o.listOfProducts;
            oR.total = o.total;
            oR.products = o.products.Select(p => p.MapProductEntityToResource()).ToList();


            return oR;
        }


    }
}
