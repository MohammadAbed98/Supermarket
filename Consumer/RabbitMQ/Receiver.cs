using Consumer.Manager;
using Microsoft.Extensions.DependencyInjection;
using Order.Entities;
using Order.Manager;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System;
using System.Text;

namespace Order.RabbitMQ
{
    public class Receiver
    {
        public static IServiceProvider _serviceProvider;
        public Receiver(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider ;
        }
        public void ProductReciver()
        {
            var factory = new ConnectionFactory() { HostName = "localhost" };
            using var connection = factory.CreateConnection();
            using var channel = connection.CreateModel();
            channel.ExchangeDeclare(exchange: "logs", type: ExchangeType.Fanout);


            var queueName = channel.QueueDeclare().QueueName;
            channel.QueueBind(queue: "ProductsQueue",
                                              exchange: "logs",
                                              routingKey: "");

            Console.WriteLine(" [*] Waiting for logs.");

            var consumer = new EventingBasicConsumer(channel);
            consumer.Received += (model, ea) =>
            {
                var body = ea.Body.ToArray();
                var message = Encoding.UTF8.GetString(body);
                Console.WriteLine("[ Receiver ] Recive: {0}", message);
                Console.WriteLine("msg: ", message);
                int id = Int16.Parse(message.Split(",")[1]);
                ProductOperation(message.Split(",")[0], id);
            };
            channel.BasicConsume(queue: "ProductsQueue",
                                 autoAck: true,
                                 consumer: consumer);

            Console.WriteLine(" Press [enter] to exit.");
            Console.ReadLine();
        }

        public void HarvestReciver()
        {
            var factory = new ConnectionFactory() { HostName = "localhost" };
            using var connection = factory.CreateConnection();
            using var channel = connection.CreateModel();
            channel.ExchangeDeclare(exchange: "logs", type: ExchangeType.Fanout);


            var queueName = channel.QueueDeclare().QueueName;
            channel.QueueBind(queue: "HarvestQueue",
                                              exchange: "logs",
                                              routingKey: "");

            Console.WriteLine(" [*] Waiting for logs.");

            var consumer = new EventingBasicConsumer(channel);
            consumer.Received += (model, ea) =>
            {
                var body = ea.Body.ToArray();
                var message = Encoding.UTF8.GetString(body);
                Console.WriteLine("msg >>>>>>>>>>>>> : "+ message);
                if(message == "RefreshData")
                {
                    RefreshData();
                    Console.WriteLine("Refreshing : " );


                }
            };
            channel.BasicConsume(queue: "HarvestQueue",
                                 autoAck: true,
                                 consumer: consumer);

            Console.WriteLine(" Press [enter] to exit.");
            Console.ReadLine();
        }


        public static void ProductOperation(string productOperation, int productId)
        {
            IServiceScope scope = _serviceProvider.CreateScope();
            var manager = scope.ServiceProvider.GetRequiredService<IProductManager>();
            var consumerManager = scope.ServiceProvider.GetRequiredService<IConsumerManager>();
            ProductEntity product;
            switch (productOperation)
            {
                case "Added":
                    product = consumerManager.getProdutFromProductMicroservice(productId);
                    manager.AddProduct(product);
                    break;
                case "Updated":
                    product = consumerManager.getProdutFromProductMicroservice(productId);
                    manager.UpdateProduct(productId , product);

                    break;
                case "Deleted":
                    manager.Delete(productId);

                    break;

                default:
                    break;
            }
        }

        public static void RefreshData()
        {
            IServiceScope scope = _serviceProvider.CreateScope();
            var harvestManager = scope.ServiceProvider.GetRequiredService<IHarvestManager>();
            harvestManager.RefreshData();
        }

    }
}

