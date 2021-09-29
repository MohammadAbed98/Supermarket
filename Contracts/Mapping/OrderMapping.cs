
using supemarket.models;
using Supemarket.Entities;
using Supemarket.Repositories.Orders;
using System.Collections.Generic;

namespace Supemarket.Contracts.Mapping
{
    public static class OrderMapping
    { 

        public static Order MapOrderModelToEntity(this OrderModel orderModel)
        {
            Order o = new Order();
            o.address = orderModel.address;
            o.total = orderModel.total;
            return o;
        }

   

    }
}
