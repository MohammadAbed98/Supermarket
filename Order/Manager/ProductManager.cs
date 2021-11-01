using Order.Contracts.Mapping;
using Order.Entities;
using Order.Repositories.ProductRepo;
using Order.Resources;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Order.Manager
{
    public interface IProductManager
    {
        public ServiceResponse<ProductResource> AddProduct(ProductEntity newProduct);

        public ServiceResponse<ProductResource> GetProductById(int id);
        public ServiceResponse<ProductResource> UpdateProduct(int id, ProductEntity updatedProduct);
        public ServiceResponse<List<ProductResource>> GetAllProducts();
        public ServiceResponse<ProductResource> Delete(int id);
        public bool DeleteAllProducts();
        public ServiceResponse<List<ProductResource>> getSearchProduct(string searchStr);
    }


    public class ProductManager : IProductManager
    {
        private readonly IProductRepo _productRepo;
        public ProductManager(IProductRepo productRepo)
        {
            _productRepo = productRepo;
        }
        public ServiceResponse<ProductResource> AddProduct(ProductEntity newProduct)
        {
            var serviceResponse = new ServiceResponse<ProductResource>();
            //try
            //{
                _productRepo.AddProduct(newProduct);
                serviceResponse.Data = newProduct.MapProductEntityToResource();
                serviceResponse.Success = true;
            //}
            //catch (Exception e)
            //{
            //    serviceResponse.Message = e.Message.ToString();
            //    serviceResponse.Success = false;

            //}
            //if (serviceResponse.Success == true)
            //{
            //    Sender sendMsg = new Sender();
            //    sendMsg.Send("Added", serviceResponse.Data.Id, serviceResponse.Data.name);
            //}
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

        public ServiceResponse<ProductResource> UpdateProduct(int id, ProductEntity updatedProduct)
        {
            var serviceResponse = new ServiceResponse<ProductResource>();
            try
            {
                ProductEntity product = new ProductEntity();
                product = _productRepo.UpdateProduct(id, updatedProduct);
                serviceResponse.Data = product.MapProductEntityToResource();
            }
            catch (Exception e)
            {
                serviceResponse.Data = null;
                serviceResponse.Success = false;
                serviceResponse.Message = "This Product does not exist";
            }

            //if (serviceResponse.Success == true)
            //{
            //    Sender sendMsg = new Sender();
            //    sendMsg.Send("Updated", serviceResponse.Data.Id, serviceResponse.Data.name);
            //}

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

            //if (serviceResponse.Success == true)
            //{
            //    Sender sendMsg = new Sender();
            //    sendMsg.Send("Deleted", serviceResponse.Data.Id, serviceResponse.Data.name);
            //}

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

        public bool DeleteAllProducts()
        {
            try
            {
             _productRepo.DeleteAllProducts();

            }
            catch
            {
                return false;
            }
            return true;

        }

       

        //public ProductEntity getProdutFromProductMicroservice()
        //{

        //    ProductEntity product = new ProductEntity() ;   
        //    var streamTask = client.GetStreamAsync("");
        //}




    }
}


