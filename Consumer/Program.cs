using Consumer.Manager;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using Order.Data;
using Order.Manager;
using Order.RabbitMQ;
using Order.Repositories.ProductRepo;
using System;
using System.Threading.Tasks;

namespace Consumer
{
    class Program
    {
        public static IServiceProvider serviceProvider;

        static void Main(string[] args)
        {

            IServiceCollection services = new ServiceCollection();
            ConfigureServices(services);

            IApplicationBuilder app = new ApplicationBuilder(serviceProvider);
            
            Receiver receiver = new Receiver(serviceProvider);

            Task task1 = Task.Factory.StartNew(() => receiver.ProductReciver());
            Task task2 = Task.Factory.StartNew(() => receiver.HarvestReciver());
            Task.WaitAll(task1, task2);


        }

        public static void ConfigureServices(IServiceCollection services)
        {
            IConfiguration _configuration = new ConfigurationBuilder()
                 .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddEnvironmentVariables()
                .Build();


            services.AddDbContext<OrderDbContext>(options => options.UseSqlServer(_configuration.GetConnectionString("DefaultConnection")));
            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Consumer", Version = "v1" });
            });
            services.AddSwaggerGen();

            services.AddScoped<IConsumerManager, ConsumerManager>();
            services.AddScoped<IHarvestManager, HarvestManager>();
            services.AddScoped<IProductManager, ProductManager>();
            services.AddScoped<IProductRepo, ProductRepo>();

            serviceProvider = services.BuildServiceProvider(true);
        }

       

    }
}
