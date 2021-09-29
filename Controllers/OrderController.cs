using Microsoft.AspNetCore.Mvc;
using Supemarket.Manager;
using Supemarket.Entities;
using System.Collections.Generic;
using supemarket.models;

namespace Supemarket.Controllers
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
        public ServiceResponse<Order> AddOrder(OrderModel newOrder)
        {
            return _orderManager.AddOrder(newOrder);
        }
        [HttpGet]
        public ServiceResponse<List<Order>> Get()
        {
            return _orderManager.Get();
        }

        [HttpGet("{id}")]
        public ServiceResponse<Order> GetById(int id)
        {

            return _orderManager.GetByIdOrder(id); 
        }

        [HttpPut("{id}")]
        public ServiceResponse<Order> UpdateOrder(int id , OrderModel updatedOrder)
        {
    
            return _orderManager.UpdateOrder(id , updatedOrder);
        }

        [HttpDelete("{id}")]
        public ServiceResponse<Order> DeleteOrder(int id)
        {

            return _orderManager.DeleteOrder(id);
        }

    }
}
