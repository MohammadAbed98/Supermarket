//using Order.Entities;
//using Order.Manager;
//using RabbitMQ.Client;
//using RabbitMQ.Client.Events;
//using System;
//using System.Text;

//namespace Order.RabbitMQ
//{
//    public class Receiver 
//    {
//        private static readonly IProductManager _productManager;
//        public Receiver(IProductManager productManager)
//        {
//            IProductManager _IProductManager =  productManager;
//        }
//        public static void Receive()
//        {
//            var factory = new ConnectionFactory() { HostName = "localhost" };
//            using var connection = factory.CreateConnection();
//            using var channel = connection.CreateModel();
//            channel.ExchangeDeclare(exchange: "logs", type: ExchangeType.Fanout);


//            var queueName = channel.QueueDeclare().QueueName;
//            channel.QueueBind(queue: "ProductsQueue",
//                              exchange: "logs",
//                              routingKey: "");

//            Console.WriteLine(" [*] Waiting for logs.");

//            var consumer = new EventingBasicConsumer(channel);
//            consumer.Received += (model, ea) =>
//            {
//                var body = ea.Body.ToArray();
//                var message = Encoding.UTF8.GetString(body);
//                Console.WriteLine("[ Receiver ] Recive: {0}", message);
//                Console.WriteLine(message);
//                int id = Int16.Parse(message.Split(",")[1]);
//                ProductOperation(message.Split(",")[0], id);
//            };
//            channel.BasicConsume(queue: "ProductsQueue",
//                                 autoAck: true,
//                                 consumer: consumer);

//            Console.WriteLine(" Press [enter] to exit.");
//            Console.ReadLine();
//        }

//        public static void ProductOperation(string productOperation, int productId)
//        {
//            Console.WriteLine("Op: ", productOperation);
//            switch (productOperation)
//            {
//                case "Added":
//                    ProductEntity product = _productManager.getProdutFromProductMicroservice(productId);

//                    _productManager.AddProduct(product);

//                    break;
//                case "Updated":
//                    Console.WriteLine();

//                    break;
//                case "Deleted":
//                    Console.WriteLine();

//                    break;

//                default:
//                    break;
//            }
//        }

//    }
//}


    