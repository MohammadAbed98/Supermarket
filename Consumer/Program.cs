using Consumer.Manager;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using Order.Data;
using Order.Manager;
using Order.RabbitMQ;
using Order.Repositories.ProductRepo;
using System;

namespace Consumer
{
    class Program
    {
        public static IServiceProvider serviceProvider;
        static void Main(string[] args)
        {
            IServiceCollection services = new ServiceCollection();

            ConfigureServices(services);

            Receiver receiver = new Receiver(serviceProvider);
            receiver.Recive();

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
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Supemarket", Version = "v1" });
            });

            services.AddScoped<IConsumerManager, ConsumerManager>();
            services.AddScoped<IProductManager, ProductManager>();
            services.AddScoped<IProductRepo, ProductRepo>();
            services.AddCors(options =>
            {
                options.AddPolicy(
                  "CorsPolicy",
                  builder => builder.WithOrigins("http://localhost:4200", "https://localhost:4200")
                  .AllowAnyMethod()
                  .AllowAnyHeader()
                  .AllowCredentials());
            });
            serviceProvider = services.BuildServiceProvider(true);
        }
    }
}
