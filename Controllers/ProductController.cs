using Microsoft.AspNetCore.Mvc;
using Supemarket.Manager;
using Supemarket.Entities;
using Supemarket.Repositories.ProductRepo;
using System.Collections.Generic;
using Supemarket.Resources;
using Supemarket.Models;

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
            productManager = _productManager ;
        }

        // GET: api/<ValuesController>
        [HttpGet]
        public ServiceResponse<List<Product>> Get()
        {
            return productManager.GetAllProducts();
        }

        // GET api/<ValuesController>/5
        [HttpPost]
        public ServiceResponse<Product> AddProduct (ProductModel newProduct)
        {
            return productManager.AddProduct(newProduct);
        }

        // POST api/<ValuesController>
        [HttpGet("{id}")]
        public ServiceResponse<Product> GetProductById(int id)
        {
            return productManager.GetProductById(id);

          
        }

        // PUT api/<ValuesController>/5
        [HttpPut("{id}")]
        public ServiceResponse<Product> UpdateProduct(int id , ProductModel updatedProduct)
        {
            return productManager.UpdateProduct(id , updatedProduct);
        }

        // DELETE api/<ValuesController>/5
        [HttpDelete("{id}")]
        public ServiceResponse<Product> Delete(int id)
        {
            return productManager.Delete(id);
        }

       
    }
}
