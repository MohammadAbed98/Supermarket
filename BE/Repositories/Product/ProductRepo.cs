using Supemarket.Data;
using Supemarket.Entities;
using Supemarket.Resources;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Supemarket.Repositories.ProductRepo
{
    public interface IProductRepo
    {
        public List<Product> GetAllProducts();
        public Product GetProductById(int id);
        public Product AddProduct(Product newProduct);
        public Product UpdateProduct(int id , Product updatedProduct);
        public Product Delete(int id);
        public Product Find(int id);
        public List<Product> getSearchProduct(string searchStr);
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
        public List<Product> GetAllProducts()
        {
            return _db.Products.ToList() ;
        }
        public Product GetProductById(int id)
        {
            return Find(id);
        }

        public Product AddProduct(Product newProduct)
        {

            //if (!ModelState.IsValid)
            //{

            //}

                //newProduct.id = products.Max(c => c.id) + 1;
                _db.Products.Add(newProduct);
                _db.SaveChanges();
                return newProduct;
          

        }

        public Product Delete(int id)
        {

                Product product = Find(id);
                _db.Products.Remove(product);
                _db.SaveChanges();
               return product;



        }



        public Product UpdateProduct(int id ,  Product updatedProduct)
        {
            Product product = Find(id);
            product.name = updatedProduct.name;
            product.price = updatedProduct.price;
            //product.parcode = updatedProduct.parcode;
            product.number_of_items = updatedProduct.number_of_items;
            product.category = updatedProduct.category;
            product.production_date = updatedProduct.production_date;
            product.expiry_date = updatedProduct.expiry_date;
            product.width = updatedProduct.width;
            product.height = updatedProduct.height;
            product.length = updatedProduct.length;
            product.active = updatedProduct.active;
            product.made_in = updatedProduct.made_in;
            _db.SaveChanges();
            return product;
        }

        public Product Find(int id)
        {
            return _db.Products.FirstOrDefault(p => p.id == id);
        }

        public List<Product> getSearchProduct(string searchStr)
        {
            List<Product> resultList = new();
            return  resultList = _db.Products.Where(ele => ele.name.Contains(searchStr)).ToList();

            //return _db.Products.FindAll( p => p.name.Contains(searchStr));
        }
    }
}
