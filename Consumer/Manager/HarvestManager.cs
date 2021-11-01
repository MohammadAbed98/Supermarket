using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Order.Contracts.Mapping;
using Order.Entities;
using Order.Manager;
using Order.Resources;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Consumer.Manager
{
    public interface IHarvestManager
    {
        public void CheckDifferanceBetweenViewCachAndProductData();
        public string RefreshData();
    }

    class HarvestManager : IHarvestManager
    {
        public static IProductManager _productManager;
        public static IConsumerManager _consumerManager;
        public HarvestManager(IServiceProvider serviceProvider)
        {
            IServiceScope scope = serviceProvider.CreateScope();
            _productManager = scope.ServiceProvider.GetRequiredService<IProductManager>();
            _consumerManager = scope.ServiceProvider.GetRequiredService<IConsumerManager>();
        }

        public void CheckDifferanceBetweenViewCachAndProductData()
        {
            List<ProductResource> allProducsFromViewCach = _productManager.GetAllProducts().Data;
            List<int> allProductsIdFromViewCach = allProducsFromViewCach.Select(c => c.Id).ToList();
            Console.WriteLine(string.Join(",", allProductsIdFromViewCach));

            List<ProductEntity> allProducsFromProduct = _consumerManager.getAllProdutsFromProductMicroservice();
            List<int> allProductsIdFromProduct = allProducsFromProduct.Select(c => c.id).ToList();
            Console.WriteLine(string.Join(",", allProductsIdFromProduct));


            List<int> distinct1 = allProductsIdFromViewCach.Except(allProductsIdFromProduct).ToList();
            List<int> distinct2 = allProductsIdFromProduct.Except(allProductsIdFromViewCach).ToList();

            //if (distinct1.Count > 0 || distinct2.Count > 0)
            // RefreshData

        }

        public string RefreshData()
        {
            try
            {
                List<ProductEntity> allProducsFromProduct = _consumerManager.getAllProdutsFromProductMicroservice();
                if (_productManager.DeleteAllProducts())
                {
                    Console.WriteLine("id: " , allProducsFromProduct[0]);

                    foreach (ProductEntity product in allProducsFromProduct)
                    {

                        _productManager.AddProduct(product);
                    }
                }
            }
            catch (Exception e)
            {
                return e.Message;
            }

            return "All Data Updated";

        }
    }
}
