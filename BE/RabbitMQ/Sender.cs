using System;
using RabbitMQ.Client;
using System.Text;

/// http://localhost:15672/
namespace Supemarket.RabbitMQ
{
    public class Sender
    {
        public void Send(string opp , int productId , string productName)
        {
            // create a connection to the server:
            var factory = new ConnectionFactory() { HostName = "localhost" };
            using (var connection = factory.CreateConnection())
            using (var channel = connection.CreateModel())
            {
                channel.QueueDeclare(queue: "ProductsQueue",
                                     durable: false,
                                     exclusive: false,
                                     autoDelete: false,
                                     arguments: null);
                string sentMessage = "Product "+ productName + " with id: " + productId +" is "+ opp    ; 
                var body = Encoding.UTF8.GetBytes(sentMessage);

                channel.BasicPublish(exchange: "",
                                     routingKey: "ProductsQueue",
                                     basicProperties: null,
                                     body: body);

                Console.WriteLine("[ Sender ]  Sent: {0}", sentMessage);

            }

        }

    }
}