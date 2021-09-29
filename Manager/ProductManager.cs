using Supemarket.Contracts.Mapping;
using Supemarket.Entities;
using Supemarket.Models;
using Supemarket.Repositories.ProductRepo;
using Supemarket.Resources;
using System.Collections.Generic;

namespace Supemarket.Manager
{
    public interface IProductManager
    {
        public Product Find(int id);
        public ServiceResponse<Product> GetProductById(int id);
        public ServiceResponse<Product> AddProduct(ProductModel newProduct);
        public ServiceResponse<Product> UpdateProduct(Product updatedProduct);
        ServiceResponse<List<Product>> GetAllProducts();
        ServiceResponse<Product> Delete(int id);
    }


    public class ProductManager : IProductManager
    {
        private readonly IProductRepo _productRepo;
        public ProductManager(IProductRepo productRepo)
        {
            _productRepo = productRepo;
        }

        public ServiceResponse<Product> AddProduct(ProductModel newProduct)
        {
            var serviceResponse = new ServiceResponse<Product>();
            Product p = newProduct.MapProductModelToEntity();
            _productRepo.AddProduct(p);
            serviceResponse.Data = p;
            return serviceResponse;
        }

        public ServiceResponse<List<Product>> GetAllProducts()
        {
            return _productRepo.GetAllProducts();
        }


        public ServiceResponse<Product> GetProductById(int id)
        {
            var serviceResponse = new ServiceResponse<Product>();

            if (Find(id) != null)
            {
                return _productRepo.GetProductById(id);
            }
            else
            {
                serviceResponse.Success = false;
                serviceResponse.Message = "This Product does not exist";
            }
            return serviceResponse;
        }

        public ServiceResponse<Product> UpdateProduct(Product updatedProduct)
        {
            var serviceResponse = new ServiceResponse<Product>();
            if (Find(updatedProduct.id) != null)
            {
                serviceResponse = _productRepo.UpdateProduct(updatedProduct);
            }
            else
            {
                serviceResponse.Data = null;
                serviceResponse.Success = false;
                serviceResponse.Message = "This Product does not exist";
            }
            return serviceResponse;
        }
        public ServiceResponse<Product> Delete(int id)
        {
            var serviceResponse = new ServiceResponse<Product>();
            if (Find(id) != null)
            {
                serviceResponse = _productRepo.Delete(id);
            }
            else
            {
                serviceResponse.Data = null;
                serviceResponse.Success = false;
                serviceResponse.Message = "This Product does not exist";
            }
            return serviceResponse;
        }

        public Product Find(int id)
        {
            return _productRepo.Find(id);
        }
    }
}
