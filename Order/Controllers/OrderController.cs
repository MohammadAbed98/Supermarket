using Microsoft.AspNetCore.Mvc;
using Order.Manager;
using Order.Entities;
using System.Collections.Generic;
using supemarket.models;
using Order.Models;
using System.Threading.Tasks;
using Order.Resources;
using System;
using order.models;

namespace Order.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderManager _orderManager;

        public OrderController(IOrderManager orderManager)
        {
            _orderManager = orderManager;
        }

        [HttpPost]
        public ServiceResponse<OrderResource> AddOrder(OrderModel newOrder)
        {
            return _orderManager.AddOrder(newOrder);
        }
        [HttpGet]
        public async Task<ServiceResponse<List<OrderResource>>> Get()
        {
            return await _orderManager.Get();
        }

        [HttpGet("{id}")]
        public ServiceResponse<OrderResource> GetById(int id)
        {

            return _orderManager.GetByIdOrder(id); 
        }

        [HttpPut("{id}")]
        public ServiceResponse<OrderResource> UpdateOrder(int id , OrderModel updatedOrder)
        {
    
            return _orderManager.UpdateOrder(id , updatedOrder);
        }

        [HttpDelete("{id}")]
        public ServiceResponse<OrderResource> DeleteOrder(int id)
        {

            return _orderManager.DeleteOrder(id);
        }

    }
}
