using supemarket.models;
using Supemarket.Contracts.LightResources;
using Supemarket.Contracts.Mapping;
using Supemarket.Entities;
using Supemarket.Repositories.Orders;
using Supemarket.Repositories.ProductRepo;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Supemarket.Manager
{
    public interface IOrderManager
    {
        public Order Find(int id);
        public ServiceResponse<Order> GetByIdOrder(int id);
        public ServiceResponse<List<Order>> Get();
        public ServiceResponse<Order> AddOrder(OrderModel newOrder);
        public ServiceResponse<Order> UpdateOrder(int id , OrderModel updatedorder);
        public ServiceResponse<Order> DeleteOrder(int id);

    }

    public class OrderManager : IOrderManager
    {
        private readonly IOrderRepo _orderRepo;
        private readonly IProductRepo _productRepo;
        public OrderManager(IOrderRepo orderRepo , IProductRepo productRepo)
        {
           _orderRepo = orderRepo;
            _productRepo = productRepo;
        }
      
        public ServiceResponse<Order> AddOrder(OrderModel newOrder)
        {
            var serviceResponse = new ServiceResponse<Order>();
            var products = new List<Product>();
            //var productsEn = new List<Product>();
            products = _productRepo.FindProductsByListOfIds(newOrder.products);
            Order o = newOrder.MapOrderModelToEntity();
            o.products = products;
            //List<Product> o.products = products.ToList();

            _orderRepo.AddOrder(o);
            serviceResponse.Data = o;
            return serviceResponse;
        }

        public ServiceResponse<List<Order>> Get()
        {
            var serviceResponse = new ServiceResponse<List<Order>>();

            var orders = new List<Order>() ;
            orders = _orderRepo.GetAllOrders();
            try
            {
                if(orders.Count > 0)
                {
                    serviceResponse.Data = orders;
                    serviceResponse.Message = "This is all orders";
                }
                else
                {
                    serviceResponse.Message = "No any orders";
                }
                
            }catch(Exception e)
            {
                serviceResponse.Message = "Error ";

            }
            
            return serviceResponse;
        }


        public ServiceResponse<Order> GetByIdOrder(int id)
        {
            var serviceResponse = new ServiceResponse<Order>();
           
            if (Find(id) != null)
            {
                serviceResponse.Data = _orderRepo.GetById(id) ;
                serviceResponse.Message = "Done";

            }
            else
            {
                serviceResponse.Success = false;
                serviceResponse.Message = "This Order does not exist";
            }
            return serviceResponse;
        }

        public ServiceResponse<Order> UpdateOrder(int id , OrderModel updatedorder)
        {
            var serviceResponse = new ServiceResponse<Order>();
            if (Find(id) != null)
            {
                Order o = updatedorder.MapOrderModelToEntity();
                serviceResponse.Success = _orderRepo.UpdateOrder(id , updatedorder);
                serviceResponse.Data = o;
            }
            else
            {
                serviceResponse.Data = null;
                serviceResponse.Success = false;
                serviceResponse.Message = "This Order does not exist";
            }
            return serviceResponse;
        }

        public ServiceResponse<Order> DeleteOrder(int id)
        {
            var serviceResponse = new ServiceResponse<Order>();
            Order deletedOrder = Find(id);
            if (deletedOrder != null)
            {
                serviceResponse.Success = _orderRepo.DeleteOrder(deletedOrder);
                if (serviceResponse.Success)
                {
                    serviceResponse.Data = deletedOrder ;
                    serviceResponse.Message = "Removed Orderd";
                }
                else
                {
                    serviceResponse.Data = deletedOrder;
                    serviceResponse.Message = "ERROR!! Did not removed Orderd";
                }
                
            }
            else
            {
                serviceResponse.Data = null;
                serviceResponse.Success = false;
                serviceResponse.Message = "This Order does not exist";
            }
            return serviceResponse;
        }

        public Order Find(int id)
        {
            return _orderRepo.Find(id);
        }
    }
}
