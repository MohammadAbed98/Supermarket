
using order.models;
using Order.Contracts.Mapping;
using Order.Entities;
using Order.Resources;
using System.Linq;

namespace Order.Contracts.Mapping
{
    public static class OrderMapping
    { 

        public static OrderEntity MapOrderModelToEntity(  this OrderModel orderModel )
        {
            OrderEntity order = new OrderEntity();
            order.address = orderModel.address;
            order.total = orderModel.total;
            return order;
        }
        public static OrderResource MapOrderEntitytoResource(this OrderEntity o)
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
