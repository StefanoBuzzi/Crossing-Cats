using CrossingCat.Domain.Interfaces;
using CrossingCats.Business.Managers;
using CrossingCats.Business.Services;
using CrossingCats.Domains.Interfaces;
using CrossingCats.Infrastructure.Models;

namespace Microsoft.Extensions.DependencyInjection
    {
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddCrossingCatsServices(this IServiceCollection services)
        {
            services.AddScoped<IMatchService, MatchService>();
            services.AddScoped<IPlayerService, PlayerService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IGameManager<Player, Game>, GameManager>();

            return services;
        }
    }
}