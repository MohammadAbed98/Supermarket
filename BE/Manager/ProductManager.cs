using Supemarket.Contracts.Mapping;
using Supemarket.Entities;
using Supemarket.Models;
using Supemarket.RabbitMQ;
using Supemarket.Repositories.ProductRepo;
using Supemarket.Resources;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Supemarket.Manager
{
    public interface IProductManager
    {
        public ServiceResponse<ProductResource> AddProduct(ProductModel newProduct);
        public ServiceResponse<ProductResource> GetProductById(int id);
        public ServiceResponse<ProductResource> UpdateProduct(int id, ProductModel updatedProduct);
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
            try
            {
                ProductEntity product = newProduct.MapProductModelToEntity();
                _productRepo.AddProduct(product);
                serviceResponse.Data = product.MapProductEntityToResource();
                serviceResponse.Success = true;
            }
            catch (Exception e)
            {
                serviceResponse.Message = e.Message.ToString();
                serviceResponse.Success = false;

            }
            if(serviceResponse.Success == true)
            {
                Sender sendMsg = new Sender();
                sendMsg.Send("Added" , serviceResponse.Data.Id , serviceResponse.Data.name);
            }
            return serviceResponse;
        }

        public ServiceResponse<List<ProductResource>> GetAllProducts()
        {
            ServiceResponse<List<ProductResource>> serviceResponse = new ServiceResponse<List<ProductResource>>();
            List<ProductEntity> products = new List<ProductEntity>();

            products = _productRepo.GetAllProducts();
            if (products is null)
            {
                serviceResponse.Data = null;
                serviceResponse.Success = false;
                serviceResponse.Message = "No Products";
                return serviceResponse;
            }
            serviceResponse.Data = products.Select(o => o.MapProductEntityToResource()).ToList();

            return serviceResponse;
        }


        public ServiceResponse<ProductResource> GetProductById(int id)
        {
            var serviceResponse = new ServiceResponse<ProductResource>();
            ProductEntity product = new ProductEntity();
            product = _productRepo.GetProductById(id);
            if (product is null)
            {
                serviceResponse.Data = null;
                serviceResponse.Success = false;
                serviceResponse.Message = "This Product does not exist";
                return serviceResponse;

            }
            serviceResponse.Data = product.MapProductEntityToResource();
            return serviceResponse;
        }

        public ServiceResponse<ProductResource> UpdateProduct(int id, ProductModel updatedProduct)
        {
            var serviceResponse = new ServiceResponse<ProductResource>();
            try
            {
                ProductEntity product = new ProductEntity();
                product = _productRepo.UpdateProduct(id, updatedProduct.MapProductModelToEntity());
                serviceResponse.Data = product.MapProductEntityToResource();
            }
            catch (Exception e)
            {
                serviceResponse.Data = null;
                serviceResponse.Success = false;
                serviceResponse.Message = "This Product does not exist";
            }

            if (serviceResponse.Success == true)
            {
                Sender sendMsg = new Sender();
                sendMsg.Send("Updated", serviceResponse.Data.Id, serviceResponse.Data.name);
            }

            return serviceResponse;
        }
        public ServiceResponse<ProductResource> Delete(int id)
        {
            var serviceResponse = new ServiceResponse<ProductResource>();
            ProductEntity product = new ProductEntity();
            product = _productRepo.Delete(id);

            if (product is null)
            {
                serviceResponse.Data = null;
                serviceResponse.Success = false;
                serviceResponse.Message = "This Product does not exist";
                return serviceResponse;
            }
            serviceResponse.Data = product.MapProductEntityToResource();

            if (serviceResponse.Success == true)
            {
                Sender sendMsg = new Sender();
                sendMsg.Send("Deleted", serviceResponse.Data.Id, serviceResponse.Data.name);
            }

            return serviceResponse;
        }

        public ServiceResponse<List<ProductResource>> getSearchProduct(string searchStr)
        {
            var serviceResponse = new ServiceResponse<List<ProductResource>>();
            List<ProductEntity> products = new List<ProductEntity>();
            products = _productRepo.getSearchProduct(searchStr);
            serviceResponse.Data = products.Select(o => o.MapProductEntityToResource()).ToList();
            return serviceResponse;
        }
    }
}
