using Order.Contracts.Mapping;
using Order.Repositories.Orders;
using Order.Repositories.ProductRepo;
using Order.Resources;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using order.models;
using Order.Entities;
using Order.RabbitMQ;

namespace Order.Manager
{
    public interface IOrderManager
    {
        public OrderEntity FindOrder(int id);
        public ServiceResponse<OrderResource> GetByIdOrder(int id);
        public Task<ServiceResponse<List<OrderResource>>> Get();
        public ServiceResponse<OrderResource> AddOrder(OrderModel newOrder);
        public ServiceResponse<OrderResource> UpdateOrder(int id, OrderModel updatedorder);
        public ServiceResponse<OrderResource> DeleteOrder(int id);
        string SendMessageToHarvestQueue();
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
            OrderResource rderResource = new OrderResource();
            string combindedProductsList = "";
            var products = new List<ProductEntity>();
            try
            {
                products = FindProductsByListOfIds(newOrder.products);
                for (int i = 0; i < products.Count; i++)
                {
                    combindedProductsList = combindedProductsList + products[i].name + ", ";
                }
                var order = newOrder.MapOrderModelToEntity();
                order.listOfProducts = combindedProductsList;
                order.products = products;
                rderResource.products = products.Select(p => p.MapProductEntityToResource()).ToList();
                try
                {
                    bool succes = _orderRepo.AddOrder(order);
                    if (succes)
                    {
                        serviceResponse.Success = true;
                        serviceResponse.Message = "This Order Added";
                        serviceResponse.Data = rderResource;
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
            List<OrderResource> orderResourcesList = new List<OrderResource>();
            var orders = new List<OrderEntity>();
            orders = await _orderRepo.GetAllOrders();

            if (orders != null)
            {
                orderResourcesList = orders.Select(o => o.MapOrderEntitytoResource()).ToList();
                serviceResponse.Data = orderResourcesList;
                serviceResponse.Message = "This is all orders";
            }
            else
            {
                serviceResponse.Message = "No any orders";
            }
            return serviceResponse;
        }

        public ServiceResponse<OrderResource> GetByIdOrder(int id)
        {
            var serviceResponse = new ServiceResponse<OrderResource>();
            OrderResource oRList = new OrderResource();
            var order = new OrderEntity();

            order = _orderRepo.GetById(id);
            if (order is null)
            {
                serviceResponse.Success = false;
                serviceResponse.Data = null;
                serviceResponse.Message = "This Order does not exist";
                return serviceResponse;
            }
            oRList = order.MapOrderEntitytoResource();
            serviceResponse.Data = oRList;
            serviceResponse.Message = "Done";



            return serviceResponse;
        }

        public ServiceResponse<OrderResource> UpdateOrder(int id, OrderModel updatedorder)
        {
            var serviceResponse = new ServiceResponse<OrderResource>();
            OrderEntity o = new OrderEntity();
            OrderResource oR = new OrderResource();

            string combindedProductsList = "";

            var products = new List<ProductEntity>();
            try
            {
                products = FindProductsByListOfIds(updatedorder.products);
            }

            catch (Exception e)
            {
                serviceResponse.Message = "Tere are some of products not available";
                serviceResponse.Success = false;
            }
            for (int i = 0; i < products.Count; i++)
            {
                combindedProductsList = combindedProductsList + products[i].name + ", ";
            }

            if (updatedorder is null)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = "Error in input order";
                serviceResponse.Data = null;
                return serviceResponse;
            }
            OrderEntity order = updatedorder.MapOrderModelToEntity();
            order.listOfProducts = combindedProductsList;
            order.products = products;
            OrderEntity orderUpdated = _orderRepo.UpdateOrder(id, order);
            oR.products = products.Select(p => p.MapProductEntityToResource()).ToList();
            if (orderUpdated is null)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = "This Order does nt exist";
                serviceResponse.Data = null;
                return serviceResponse;
            }


            return serviceResponse;
        }

        public ServiceResponse<OrderResource> DeleteOrder(int id)
        {
            OrderResource oR = new OrderResource();
            var serviceResponse = new ServiceResponse<OrderResource>();
            List<ProductEntity> products = new List<ProductEntity>();
            OrderEntity deletedOrder = FindOrder(id);
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

        public OrderEntity FindOrder(int id)
        {
            return _orderRepo.Find(id);
        }
        public ProductEntity FindProduct(int id)
        {
            return _productRepo.Find(id);
        }
        public List<ProductEntity> FindProductsByListOfIds(int[] products)
        {
            List<ProductEntity> productsFromDB = new();

            for (int i = 0; i < products.Count(); i++)
            {
                ProductEntity p = FindProduct(products[i]);
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

        public string SendMessageToHarvestQueue()
        {
            string message = "RefreshData";
            Sender sender = new Sender();
            sender.Send(message);
            return message;
        }
    }
}
