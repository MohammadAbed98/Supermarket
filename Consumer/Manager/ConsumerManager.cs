using Newtonsoft.Json;
using Order.Entities;
using Order.Manager;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Text;

namespace Consumer.Manager
{
    public interface IConsumerManager
    {
        public ProductEntity getProdutFromProductMicroservice(int productId);
        public List<ProductEntity>  getAllProdutsFromProductMicroservice();
    }
    class ConsumerManager : IConsumerManager
    {
        private static readonly IProductManager _productManager;
        public ConsumerManager(IProductManager productManager)
        {
            IProductManager _IProductManager = productManager;
        }
        public ProductEntity getProdutFromProductMicroservice(int productId)
        {
            string url = "https://localhost:5001/api/Product/getProductById/" + productId;
            ServiceResponse<ProductEntity> model = new ServiceResponse<ProductEntity>();
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
            try
            {
                WebResponse response = request.GetResponse();
                using (Stream responseStream = response.GetResponseStream())
                {
                    StreamReader reader = new StreamReader(responseStream);
                    model = JsonConvert.DeserializeObject<ServiceResponse<ProductEntity>>(reader.ReadToEnd());
                    return model.Data;
                }
            }
            catch (WebException ex)
            {
                WebResponse errorResponse = ex.Response;
                using (Stream responseStream = errorResponse.GetResponseStream())
                {
                    StreamReader reader = new StreamReader(responseStream, Encoding.GetEncoding("utf-8"));
                    String errorText = reader.ReadToEnd();
                }
                throw;
            }
        }

        public List<ProductEntity> getAllProdutsFromProductMicroservice()
        {
            string url = "https://localhost:5001/api/Product/";
            ServiceResponse<List<ProductEntity>> model = new ServiceResponse<List<ProductEntity>>();
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
            try
            {
                WebResponse response = request.GetResponse();
                using (Stream responseStream = response.GetResponseStream())
                {
                    StreamReader reader = new StreamReader(responseStream);
                    model = JsonConvert.DeserializeObject<ServiceResponse<List<ProductEntity>>>(reader.ReadToEnd());
                    return model.Data;
                }
            }
            catch (WebException ex)
            {
                WebResponse errorResponse = ex.Response;
                using (Stream responseStream = errorResponse.GetResponseStream())
                {
                    StreamReader reader = new StreamReader(responseStream, Encoding.GetEncoding("utf-8"));
                    String errorText = reader.ReadToEnd();
                }
                throw;
            }
        }
    }



}
