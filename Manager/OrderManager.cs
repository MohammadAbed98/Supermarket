using supemarket.models;
using Supemarket.Contracts.LightResources;
using Supemarket.Contracts.Mapping;
using Supemarket.Entities;
using Supemarket.Models;
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
        public ServiceResponse<Order> GetByIdOrder(int id);
        public ServiceResponse<List<Order>> Get();
        public ServiceResponse<OrderResource> AddOrder(OrderModel newOrder);
        public ServiceResponse<Order> UpdateOrder(int id, OrderModel updatedorder);
        public ServiceResponse<Order> DeleteOrder(int id);

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



                try
                {
                    bool succes = _orderRepo.AddOrder(newOrder.MapOrderModelToEntity(o));
                    if (succes)
                    {
                        serviceResponse.Success = true;
                        serviceResponse.Message = "This Order Added";
                        //serviceResponse.Data = o;
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

        public ServiceResponse<List<Order>> Get()
        {
            var serviceResponse = new ServiceResponse<List<Order>>();

            var orders = new List<Order>();
            orders = _orderRepo.GetAllOrders();
            try
            {
                if (orders.Count > 0)
                {
                    serviceResponse.Data = orders;
                    serviceResponse.Message = "This is all orders";
                }
                else
                {
                    serviceResponse.Message = "No any orders";
                }

            }
            catch (Exception e)
            {
                serviceResponse.Message = "Error ";

            }

            return serviceResponse;
        }


        public ServiceResponse<Order> GetByIdOrder(int id)
        {
            var serviceResponse = new ServiceResponse<Order>();

            if (FindOrder(id) != null)
            {
                serviceResponse.Data = _orderRepo.GetById(id);
                serviceResponse.Message = "Done";

            }
            else
            {
                serviceResponse.Success = false;
                serviceResponse.Message = "This Order does not exist";
            }
            return serviceResponse;
        }

        public ServiceResponse<Order> UpdateOrder(int id, OrderModel updatedorder)
        {
            var serviceResponse = new ServiceResponse<Order>();
            List<Product> products = new List<Product>();
            String combindedProductsList = "";

            if (FindOrder(id) != null)
            {
                Order o = new Order();
                try
                {
                    products = FindProductsByListOfIds(updatedorder.products);
                    for (int i = 0; i < products.Count; i++)
                    {
                        combindedProductsList = combindedProductsList + products[i].name + ", ";
                    }
                    //o.products = products;   
                    o.listOfProducts = combindedProductsList;
                    serviceResponse.Success = _orderRepo.UpdateOrder(id, updatedorder.MapOrderModelToEntity(o));
                    serviceResponse.Data = updatedorder.MapOrderModelToEntity(o);

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

        public ServiceResponse<Order> DeleteOrder(int id)
        {
            var serviceResponse = new ServiceResponse<Order>();
            Order deletedOrder = FindOrder(id);
            if (deletedOrder != null)
            {
                serviceResponse.Success = _orderRepo.DeleteOrder(deletedOrder);
                if (serviceResponse.Success)
                {
                    serviceResponse.Data = deletedOrder;
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
            //private List<Product> productsFromDB  ;

            for (int i = 0; i < products.Count(); i++)
            {
                Product p = FindProduct(products[i]);
                if (p != null)
                {

                    //Product pR = new Product();
                    //pR.name = p.name;
                    //pR.Id = p.id;
                    //pR.price = p.id;
                    //pR.parcode = p.parcode;
                    //pR.numberOfPecis = p.numberOfPecis;
                    //pR.startDate = p.startDate;
                    //pR.endtDate = p.endtDate;


                    productsFromDB.Add(p);
                }
                else
                {
                    throw new ArgumentNullException();
                }

            }
            return productsFromDB;
        }

        //public ServiceResponse<string> AddCharacterSkill(List<OrderModelWithProducts> newOrderModelWithProducts)
        //{
        //    var response = new ServiceResponse<string>();

        //    try {  _orderRepo.AddOrderProduct(newOrderModelWithProducts); }
        //    catch (Exception e)
        //    {
        //        response.Success = false;
        //        response.Message = $"Error ${e.Message}";
        //        return response;
        //    }
        //    response.Data = "Adding all skills successfully;";
        //    return response;
        //}

    }
}
