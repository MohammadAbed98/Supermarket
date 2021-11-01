using Microsoft.EntityFrameworkCore;
using Order.Data;
using Order.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Order.Repositories.Orders
{
    public interface IOrderRepo
    {
        public bool AddOrder(OrderEntity neworder);
        public Task<List<OrderEntity>> GetAllOrders();
        public OrderEntity GetById(int id);
        public bool DeleteOrder(OrderEntity deletedOrder);
        public OrderEntity UpdateOrder(int id, OrderEntity updatedOrder);
        public OrderEntity Find(int id);

        public void save();


    }
    public class OrderRepo : IOrderRepo
    {
        private readonly OrderDbContext _db;



        //private static List<Product> products = new List<Product>
        //{
        //    new Product(),
        //    new Product{ id = 1 , name = "sweet"}
        //};

        //public static List<Order> orders = new List<Order> {
        //new Order(),
        //new Order{ id = 0 , address = "Ramallah" , products = products , total = 500}
        //};

        public OrderRepo(OrderDbContext db)
        {
            _db = db;
        }

        public bool AddOrder(OrderEntity newOrder)
        {
            bool success = true;
            try
            {
                var serviceResponse = new ServiceResponse<OrderEntity>();
                _db.Orders.Add(newOrder);
                _db.SaveChanges();
            }
            catch (Exception e)
            {
                success = false;
            }

            return success;
        }
        public async Task<List<OrderEntity>> GetAllOrders()
        {
            try
            {
                return await _db.Orders
                    .Include(o => o.products)
                    .ToListAsync();
            }
            catch (Exception e)
            {
                return null;
            }

        }

        public OrderEntity GetById(int id)
        {
            try
            {
                OrderEntity o = new OrderEntity();
                o = Find(id);
                return _db.Orders
                    .Include(o => o.products).FirstOrDefault(p => p.id == id);
                //.Include(o => o.products() ) ;
            }
            catch (Exception)
            {
                return null;
            }

        }

        public bool DeleteOrder(OrderEntity deletedOrder)
        {
            bool success = true;
            try
            {
                _db.Orders.Remove(deletedOrder);
                _db.SaveChanges();
            }
            catch (Exception e)
            {
                success = false;
            }


            return success;
        }


        public OrderEntity UpdateOrder(int id, OrderEntity updatedOrder)
        {
            var serviceResponse = new ServiceResponse<OrderEntity>();
            OrderEntity toUpdateOrder = Find(id);
            if (toUpdateOrder is null)
                return null;
            toUpdateOrder.address = updatedOrder.address;
            toUpdateOrder.listOfProducts = updatedOrder.listOfProducts;
            toUpdateOrder.total = updatedOrder.total;
            _db.SaveChanges();
        
            return toUpdateOrder;
        }
public OrderEntity Find(int id)
{
    return _db.Orders.FirstOrDefault(p => p.id == id);
}

public void save()
{
    _db.SaveChangesAsync();
}

 
    }
}
