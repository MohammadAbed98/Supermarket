using Order.Data;
using Order.Entities;
using Order.Resources;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Order.Repositories.ProductRepo
{
    public interface IProductRepo
    {
        public List<ProductEntity> GetAllProducts();
        public ProductEntity GetProductById(int id);
        public ProductEntity AddProduct(ProductEntity newProduct);
        public ProductEntity UpdateProduct(int id, ProductEntity updatedProduct);
        public ProductEntity Delete(int id);
        public void DeleteAllProducts();
        public ProductEntity Find(int id);
        public List<ProductEntity> getSearchProduct(string searchStr);
    }
    public class ProductRepo : IProductRepo
    {
        public readonly OrderDbContext _db;

        public ProductRepo(OrderDbContext db)
        {
            _db = db;
        }

        public List<ProductEntity> GetAllProducts()
        {
            return _db.Products.ToList();
        }
        public ProductEntity GetProductById(int id)
        {
            return Find(id);
        }

        public ProductEntity AddProduct(ProductEntity newProduct)
        {
            //if (!ModelState.IsValid)
            //{

            //}
            //newProduct.id = products.Max(c => c.id) + 1;
            _db.Products.Add(newProduct);
            _db.SaveChanges();
            return newProduct;

        }

        public ProductEntity Delete(int id)
        {

            ProductEntity product = Find(id);
            if (product is not null)
            {
                _db.Products.Remove(product);
                _db.SaveChanges();
            }

            return product;



        }



        public ProductEntity UpdateProduct(int id, ProductEntity updatedProduct)
        {
            ProductEntity product = Find(id);
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

        public ProductEntity Find(int id)
        {
            return _db.Products.FirstOrDefault(p => p.id == id);
        }

        public List<ProductEntity> getSearchProduct(string searchStr)
        {
            List<ProductEntity> resultList = new();
            return resultList = _db.Products.Where(ele => ele.name.Contains(searchStr)).ToList();

            //return _db.Products.FindAll( p => p.name.Contains(searchStr));
        }

        public async void DeleteAllProducts()
        {
            foreach (var entity in _db.Products)
                _db.Products.Remove(entity);

            _db.SaveChanges();

        }



    }
}
