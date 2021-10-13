using Microsoft.EntityFrameworkCore;
using supemarket.models;
using Supemarket.Data;
using Supemarket.Entities;
using Supemarket.Models;
using Supemarket.Resources;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Supemarket.Repositories.Orders
{
    public interface IOrderRepo
    {
        public bool AddOrder(Order neworder);
        public Task<List<Order>> GetAllOrders();
        public Order GetById(int id);
        public bool DeleteOrder(Order deletedOrder);
        public bool UpdateOrder(int id , Order updatedOrder);
        public Order Find(int id);

        public void save();


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
        public async Task<List<Order>> GetAllOrders()
        {
            try
            {
                return  await _db.Orders
                    .Include( o => o.products)
                    .ToListAsync();
            }
            catch (Exception e)
            {
                return null;
            }

        }
        
        public Order GetById(int id)
        {
            try
            {
                Order o = new Order();
                o = Find(id);
                return _db.Orders
                    .Include(o => o.products).FirstOrDefault(p => p.id == id);
                    //.Include(o => o.products() ) ;
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


            public bool UpdateOrder(int id , Order updatedOrder)
            {
            bool success = true;
            try
            {
                var serviceResponse = new ServiceResponse<Order>();
                Order toUpdateOrder = Find(id); 
                toUpdateOrder.address = updatedOrder.address;
                toUpdateOrder.listOfProducts = updatedOrder.listOfProducts;
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

        public void save()
        {
            _db.SaveChangesAsync();
        }

 
    }
}
