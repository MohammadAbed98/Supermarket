
using supemarket.models;
using Supemarket.Entities;
using Supemarket.Resources;
using System.Linq;



namespace Supemarket.Contracts.Mapping
{
    public static class OrderMapping
    { 

        public static Order MapOrderModelToEntity(  this OrderModel orderModel )
        {
            Order order = new Order();
            order.address = orderModel.address;
            order.total = orderModel.total;
            return order;
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
