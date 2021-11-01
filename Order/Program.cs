using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

namespace Order
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();

            //Task task1 = Task.Factory.StartNew(() => CreateHostBuilder(args).Build().Run());
            //Task task2 = Task.Factory.StartNew(() => Receiver.Receive());
            //Task.WaitAll(task1, task2);

            //Console.WriteLine("All threads complete");
            //Console.ReadLine();


        }


        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });



    }
}
