using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

namespace Supemarket
{
    public class Program
    {
        public static void Main(string[] args)
        {
            //Console.WriteLine(DateTime .);
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
