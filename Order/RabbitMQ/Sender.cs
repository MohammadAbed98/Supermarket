using System;
using RabbitMQ.Client;
using System.Text;

/// http://localhost:15672/
namespace Order.RabbitMQ
{
    public class Sender
    {
        public void Send(string sentMessage)
        {
            // create a connection to the server:
            var factory = new ConnectionFactory() { HostName = "localhost" };
            using (var connection = factory.CreateConnection())
            using (var channel = connection.CreateModel())
            {
                channel.QueueDeclare(queue: "HarvestQueue",
                                     durable: false,
                                     exclusive: false,
                                     autoDelete: false,
                                     arguments: null);
                var body = Encoding.UTF8.GetBytes(sentMessage);

                channel.BasicPublish(exchange: "",
                                     routingKey: "HarvestQueue",
                                     basicProperties: null,
                                     body: body);

                Console.WriteLine("[ Sender ]  Sent: {0}", sentMessage);

            }

        }

    }
}