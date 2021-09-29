﻿using supemarket.models;
using Supemarket.Data;
using Supemarket.Entities;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Supemarket.Repositories.Orders
{
    public interface IOrderRepo
    {
        public bool AddOrder(Order neworder);
        public List<Order> GetAllOrders();
        public Order GetById(int id);
        public bool DeleteOrder(Order deletedOrder);
        public bool UpdateOrder(int id , OrderModel updatedOrder);
        public Order Find(int id);

    }
    public class OrderRepo : IOrderRepo
    {
        private readonly SupermarketDbContext _db ;

       

        //private static List<Product> products = new List<Product>
        //{
        //    new Product(),
        //    new Product{ id = 1 , name = "sweet"}
        //};

        //public static List<Order> orders = new List<Order> {
        //new Order(),
        //new Order{ id = 0 , address = "Ramallah" , products = products , total = 500}
        //};

        public OrderRepo(SupermarketDbContext db)
        {
            _db = db;
        }

        public bool AddOrder(Order newOrder)
        {
            bool success = true;
            try
            {
                var serviceResponse = new ServiceResponse<Order>();
                _db.Orders.Add(newOrder);
                _db.SaveChanges();
            }catch(Exception e)
            {
                success = false;
            }
           
            return success;
        }
        public List<Order> GetAllOrders()
        {
            try
            {
                return _db.Orders.ToList();
            }catch(Exception e)
            {
                return null;
            }
            

        }
        
        public Order GetById(int id)
        {
            try
            {
                return Find(id);
            }catch(Exception)
            {
                return null;
            }
          
        }

        public bool DeleteOrder(Order deletedOrder)
        {
            bool success = true;
            try
            {
                _db.Orders.Remove(deletedOrder);
                _db.SaveChanges();
            }catch(Exception e)
            {
                success = false;
            }
                

            return success;
        }


            public bool UpdateOrder(int id , OrderModel updatedOrder)
            {
            bool success = true;
            try
            {
                var serviceResponse = new ServiceResponse<Order>();
                Order toUpdateOrder = Find(id); 
                toUpdateOrder.address = updatedOrder.address;
                //toUpdateOrder.products = updatedOrder.products;
                toUpdateOrder.total = updatedOrder.total;
                _db.SaveChanges();
            }
            catch (Exception e)
            {
                success = false;
            }
            return success;
        }
        public Order Find(int id)
        {
            return _db.Orders.FirstOrDefault(p => p.id == id);
        }
    }
}