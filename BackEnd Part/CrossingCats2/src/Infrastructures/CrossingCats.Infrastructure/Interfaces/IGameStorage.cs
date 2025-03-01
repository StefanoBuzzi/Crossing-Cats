using CrossingCats.Infrastructure.Models;

namespace CrossingCats.Domains.Interfaces
{
    public interface IGameStorage : IStorage<Game, int>
    {
        Task<Dictionary<string, int>?> GetGameRecapAsync(int id);
    }
}