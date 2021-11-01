using System;
using RabbitMQ.Client;
using System.Text;

/// http://localhost:15672/
namespace Supemarket.RabbitMQ
{
    public interface ISender
    {
        public void Send(string opp, int productId);
    }
    public class Sender : ISender
    {
        
        public void Send(string opp , int productId )
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
                string sentMessage = opp + "," + productId     ; 
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