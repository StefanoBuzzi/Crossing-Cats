using CrossingCats.Domains.Interfaces;
using CrossingCats.Infrastructure.Models;
using CrossingCats.Infrastructure.Storages;
using CrossingCats.Infrastructure.BlobStorage;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Azure.Storage.Blobs;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddCrossingCatsDatabase(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped<IGameStorage, GameStorage>();
            services.AddScoped<IPlayerStorage, PlayerStorage>();
            services.AddScoped<IStorage<User, int>, UserStorage>();
            services.AddScoped<IBlobStorage, CrossingCatsBlobClient>(p =>
            {
                BlobServiceClient client = new BlobServiceClient(configuration["ConnectionStrings:CrossingCatsBlob"]);
                return new CrossingCatsBlobClient(configuration["ImagesContainer"], client);
            });
            services.AddDbContext<CrossingCatContext>(options => options.UseSqlServer(configuration["ConnectionStrings:CrossingCatsDb"]));

            return services;
        }
    }
}