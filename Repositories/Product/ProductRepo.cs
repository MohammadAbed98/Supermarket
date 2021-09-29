using Supemarket.Contracts.LightResources;
using Supemarket.Data;
using Supemarket.Entities;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Supemarket.Repositories.ProductRepo
{
    public interface IProductRepo
    {
        public ServiceResponse<List<Product>> GetAllProducts();
        public ServiceResponse<Product> GetProductById(int id);
        public ServiceResponse<Product> AddProduct(Product newProduct);
        public ServiceResponse<Product> UpdateProduct(Product updatedProduct);
        public ServiceResponse<Product> Delete(int id);
        public Product Find(int id);
        public List<Product> FindProductsByListOfIds(int[] products);
    }
    public class ProductRepo : IProductRepo
    {
        public readonly SupermarketDbContext _db;
        //private static List<Product> products = new List<Product>
        //{
        //    new Product(),
        //    new Product{ id = 1 , name = "sweet"}
        //};
        public ProductRepo(SupermarketDbContext db)
        {
            _db = db;
        }
        public ServiceResponse<List<Product>> GetAllProducts()
        {
            var serviceResponse = new ServiceResponse<List<Product>>();
            serviceResponse.Data = _db.Products.ToList() ;
            return serviceResponse;
        }
        public ServiceResponse<Product> GetProductById(int id)
        {
            var serviceResponse = new ServiceResponse<Product>();
            serviceResponse.Data = Find(id);
            return serviceResponse;
        }

        public ServiceResponse<Product> AddProduct(Product newProduct)
        {

            //if (!ModelState.IsValid)
            //{

            //}
            var serviceResponse = new ServiceResponse<Product>();
            try
            {
                //newProduct.id = products.Max(c => c.id) + 1;
                _db.Products.Add(newProduct);
                _db.SaveChanges();
                serviceResponse.Data = newProduct;
                serviceResponse.Success = false;
            }
            catch (Exception e)
            {
                serviceResponse.Success = false;
            }
            return serviceResponse;
        }

        public ServiceResponse<Product> Delete(int id)
        {
            var serviceResponse = new ServiceResponse<Product>();

            try
            {
                Product product = Find(id);
                _db.Products.Remove(product);
                serviceResponse.Data = product;
                _db.SaveChanges();

            }
            catch (Exception e)
            {
                serviceResponse.Success = false;
            }
            return serviceResponse;
        }

      

        public ServiceResponse<Product> UpdateProduct(Product updatedProduct)
        {
            var serviceResponse = new ServiceResponse<Product>();
            Product product = Find(updatedProduct.id);
            product.name = updatedProduct.name;
            product.price = updatedProduct.price;
            product.parcode = updatedProduct.parcode;
            product.numberOfPecis = updatedProduct.numberOfPecis;
            product.type = updatedProduct.type;
            product.startDate = updatedProduct.startDate;
            product.endtDate = updatedProduct.endtDate;
            serviceResponse.Data = product;
            _db.SaveChanges();
            return serviceResponse;
        }

        public Product Find(int id)
        {
            return _db.Products.FirstOrDefault(p => p.id == id);
        }
        public List<Product> FindProductsByListOfIds(int[] products)
        {
            List<Product> productsFromDB = new();
            //private List<Product> productsFromDB  ;

            for (int i = 0; i < products.Count() ; i++)
            {
                productsFromDB.Add(Find(products[i]));
            }
            return productsFromDB;
        }
    }
}
