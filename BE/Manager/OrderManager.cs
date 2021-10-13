using supemarket.models;
using Supemarket.Contracts.Mapping;
using Supemarket.Entities;
using Supemarket.Repositories.Orders;
using Supemarket.Repositories.ProductRepo;
using Supemarket.Resources;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Supemarket.Manager
{
    public interface IOrderManager
    {
        public Order FindOrder(int id);
        public ServiceResponse<OrderResource> GetByIdOrder(int id);
        public Task<ServiceResponse<List<OrderResource>>> Get();
        public ServiceResponse<OrderResource> AddOrder(OrderModel newOrder);
        public ServiceResponse<OrderResource> UpdateOrder(int id, OrderModel updatedorder);
        public ServiceResponse<OrderResource> DeleteOrder(int id);

    }

    public class OrderManager : IOrderManager
    {
        private readonly IOrderRepo _orderRepo;
        private readonly IProductRepo _productRepo;
        public OrderManager(IOrderRepo orderRepo, IProductRepo productRepo)
        {
            _orderRepo = orderRepo;
            _productRepo = productRepo;
        }

        public ServiceResponse<OrderResource> AddOrder(OrderModel newOrder)
        {
            var serviceResponse = new ServiceResponse<OrderResource>();
            Order o = new Order();
            OrderResource oR = new OrderResource();

            string combindedProductsList = "";

            var products = new List<Product>();

            try
            {
                products = FindProductsByListOfIds(newOrder.products);
                for (int i = 0; i < products.Count; i++)
                {
                    combindedProductsList = combindedProductsList + products[i].name + ", ";
                }
                o.listOfProducts = combindedProductsList;
                o.products = products;
                oR.products = products.Select( p => p.MapProductEntityToResource()).ToList();
                try
                {
                    bool succes = _orderRepo.AddOrder(newOrder.MapOrderModelToEntity(o));
                    if (succes)
                    {
                        serviceResponse.Success = true;
                        serviceResponse.Message = "This Order Added";
                        serviceResponse.Data = oR;
                    }
                }
                catch (Exception e)
                {
                    serviceResponse.Success = false;
                    serviceResponse.Message = "ERROR!! Not Added";

                }
            }

            catch (Exception e)
            {
                serviceResponse.Message = "Tere are some of products not available";
                serviceResponse.Success = false;
            }

            return serviceResponse;
        }

        public async Task<ServiceResponse<List<OrderResource>>> Get()
        {
            var serviceResponse = new ServiceResponse<List<OrderResource>>();
            List<OrderResource> oRList = new List<OrderResource>();

            var orders = new List<Order>();
            orders = await _orderRepo.GetAllOrders();

            try
            {
                
                if (orders != null )
                {
                    oRList = orders.Select(o => o.MapOrderEntitytoResource()).ToList();
                    serviceResponse.Data = oRList;
                    serviceResponse.Message = "This is all orders";
                }
                else
                {
                    serviceResponse.Message = "No any orders";
                }

            }
            catch (Exception e)
            {
                serviceResponse.Message = $"Error {e.Message} ";

            }

            return serviceResponse;
        }


        public ServiceResponse<OrderResource> GetByIdOrder(int id)
        {
            var serviceResponse = new ServiceResponse<OrderResource>();
            OrderResource oRList = new OrderResource();
            var order = new Order();

            if (FindOrder(id) != null)
            {
                order = _orderRepo.GetById(id); 
                oRList = order.MapOrderEntitytoResource() ;
                serviceResponse.Data = oRList;
                serviceResponse.Message = "Done";

            }
            else
            {
                serviceResponse.Success = false;
                serviceResponse.Message = "This Order does not exist";
            }
            return serviceResponse;
        }

        public ServiceResponse<OrderResource> UpdateOrder(int id, OrderModel updatedorder)
        {
            var serviceResponse = new ServiceResponse<OrderResource>();
            Order o = new Order();
            OrderResource oR = new OrderResource();

            string combindedProductsList = "";

            var products = new List<Product>();

            if (FindOrder(id) != null)
            {
                try
                {
                    products = FindProductsByListOfIds(updatedorder.products);
                    for (int i = 0; i < products.Count; i++)
                    {
                        combindedProductsList = combindedProductsList + products[i].name + ", ";
                    }
                    o.listOfProducts = combindedProductsList;
                    o.products = products;
                    oR.products = oR.products = products.Select(p => p.MapProductEntityToResource()).ToList();
                    ;
                    try
                    {
                        bool succes = _orderRepo.AddOrder(updatedorder.MapOrderModelToEntity(o));
                        if (succes)
                        {
                            serviceResponse.Success = true;
                            serviceResponse.Message = "This Order Updated";
                            serviceResponse.Data = oR;
                        }
                    }
                    catch (Exception e)
                    {
                        serviceResponse.Success = false;
                        serviceResponse.Message = "ERROR!! Didn't Updated";

                    }
                }

                catch (Exception e)
                {
                    serviceResponse.Message = "Tere are some of products not available";
                    serviceResponse.Success = false;
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

        public ServiceResponse<OrderResource> DeleteOrder(int id)
        {
            OrderResource oR = new OrderResource();
            var serviceResponse = new ServiceResponse<OrderResource>();
            List<Product> products = new List<Product>() ; 
            Order deletedOrder = FindOrder(id);
            if (deletedOrder != null)
            {
                serviceResponse.Success = _orderRepo.DeleteOrder(deletedOrder);
                if (serviceResponse.Success)
                {
                    serviceResponse.Message = "Removed Orderd";
                }
                else
                {
                    serviceResponse.Data = null;
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

        public Order FindOrder(int id)
        {
            return _orderRepo.Find(id);
        }
        public Product FindProduct(int id)
        {
            return _productRepo.Find(id);
        }
        public List<Product> FindProductsByListOfIds(int[] products)
        {
            List<Product> productsFromDB = new();

            for (int i = 0; i < products.Count(); i++)
            {
                Product p = FindProduct(products[i]);
                if (p != null)
                {
                    productsFromDB.Add(p);
                }
                else
                {
                    throw new ArgumentNullException();
                }

            }
            return productsFromDB;
        }
      
    }
}
