using Microsoft.AspNetCore.Mvc;
using Supemarket.Manager;
using Supemarket.Entities;
using System.Collections.Generic;
using supemarket.models;
using Supemarket.Models;
using System.Threading.Tasks;
using Supemarket.Resources;
using System;

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

        //[HttpPost("skill")]
        //public async Task<ActionResult<Order>> AddOrderProduct(List<OrderModelWithProducts> newOrderModelWithProducts)
        //{
        //    return Ok(await _orderManager.AddCharacterSkill(newOrderModelWithProducts));
        //}


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
