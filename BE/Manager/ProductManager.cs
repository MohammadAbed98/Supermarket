using Supemarket.Contracts.Mapping;
using Supemarket.Entities;
using Supemarket.Models;
using Supemarket.Repositories.ProductRepo;
using Supemarket.Resources;
using System.Collections.Generic;
using System.Linq;

namespace Supemarket.Manager
{
    public interface IProductManager
    {
        public Product Find(int id);       
        public ServiceResponse<ProductResource> AddProduct(ProductModel newProduct);
        public ServiceResponse<ProductResource> GetProductById(int id);
        public ServiceResponse<ProductResource> UpdateProduct(int id , ProductModel updatedProduct);
        ServiceResponse<List<ProductResource>> GetAllProducts();
        ServiceResponse<ProductResource> Delete(int id);
        ServiceResponse<List<ProductResource>> getSearchProduct(string searchStr);
    }


    public class ProductManager : IProductManager
    {
        private readonly IProductRepo _productRepo;
        public ProductManager(IProductRepo productRepo)
        {
            _productRepo = productRepo;
        }

        public ServiceResponse<ProductResource> AddProduct(ProductModel newProduct)
        {
            var serviceResponse = new ServiceResponse<ProductResource>();
            Product p = newProduct.MapProductModelToEntity();
            _productRepo.AddProduct(p);
            serviceResponse.Data = p.MapProductEntityToResource();
            return serviceResponse;
        }

        public ServiceResponse<List<ProductResource>> GetAllProducts()
        {
            ServiceResponse<List<ProductResource>> serviceResponse = new ServiceResponse<List<ProductResource>>();
            List<Product> products = new List<Product>();
            products = _productRepo.GetAllProducts();
            serviceResponse.Data = products.Select(o => o.MapProductEntityToResource()).ToList();
            
            return serviceResponse;
        }


        public ServiceResponse<ProductResource> GetProductById(int id)
        {
            var serviceResponse = new ServiceResponse<ProductResource>();
            Product product = new Product();
            if (Find(id) != null)
            {
                product = _productRepo.GetProductById(id);
                serviceResponse.Data = product.MapProductEntityToResource();
            }
            else
            {
                serviceResponse.Success = false;
                serviceResponse.Message = "This Product does not exist";
            }
            return serviceResponse;
        }

        public ServiceResponse<ProductResource> UpdateProduct(int id , ProductModel updatedProduct)
        {
            var serviceResponse = new ServiceResponse<ProductResource>();
            if (Find(id) != null)
            {
                Product product = new Product();
                product = _productRepo.UpdateProduct(id, updatedProduct.MapProductModelToEntity());
                serviceResponse.Data = product.MapProductEntityToResource(); 
            }
            else
            {
                serviceResponse.Data = null;
                serviceResponse.Success = false;
                serviceResponse.Message = "This Product does not exist";
            }
            return serviceResponse;
        }
        public ServiceResponse<ProductResource> Delete(int id)
        {
            var serviceResponse = new ServiceResponse<ProductResource>();
            if (Find(id) != null)
            {
                Product product = new Product();
                product = _productRepo.Delete(id);
                serviceResponse.Data = product.MapProductEntityToResource();
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

        public ServiceResponse<List<ProductResource>> getSearchProduct(string searchStr)
        {
            var serviceResponse = new ServiceResponse<List<ProductResource>>();
            List<Product> products = new List<Product>();
            products = _productRepo.getSearchProduct(searchStr);
            serviceResponse.Data = products.Select(o => o.MapProductEntityToResource()).ToList();

            return serviceResponse ;
        }
    }
}
