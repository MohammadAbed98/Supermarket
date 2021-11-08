using Microsoft.AspNetCore.Mvc;
using Supemarket.Manager;
using Supemarket.Entities;
using Supemarket.Repositories.ProductRepo;
using System.Collections.Generic;
using Supemarket.Resources;
using Supemarket.Models;
using System;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Supemarket.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductManager productManager;
        public ProductController(IProductManager _productManager)
        {
            productManager = _productManager;
        }

        // GET: api/<ValuesController>
        [HttpGet]
        public ServiceResponse<List<ProductResource>> Get()
        {
            return productManager.GetAllProducts();
        }

        // GET api/<ValuesController>/5
        [HttpPost]
        public ServiceResponse<ProductResource> AddProduct(ProductModel newProduct)
        {
            Console.WriteLine(newProduct.expiry_date);

            return productManager.AddProduct(newProduct);
        }

        // POST api/<ValuesController>
        [HttpGet]
        [Route("getProductById/{id}")]
        public ServiceResponse<ProductResource> GetProductById(int id)
        {
            return productManager.GetProductById(id);
        }

        // PUT api/<ValuesController>/5
        [HttpPut("{id}")]
        public ServiceResponse<ProductResource> UpdateProduct(int id, ProductModel updatedProduct)
        {
            return productManager.UpdateProduct(id, updatedProduct);
        }

        // DELETE api/<ValuesController>/5
        [HttpDelete("{id}")]
        public ServiceResponse<ProductResource> Delete(int id)
        {
            return productManager.Delete(id);
        }

        [HttpGet("{searchStr}")]
        public ServiceResponse<List<ProductResource>> getSearchProduct(string searchStr)
        {
            return productManager.getSearchProduct(searchStr);
        }
    }
}
