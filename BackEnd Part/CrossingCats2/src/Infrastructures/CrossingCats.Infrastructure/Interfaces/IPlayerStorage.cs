using CrossingCats.Infrastructure.Models;

namespace CrossingCats.Domains.Interfaces
{
    public interface IPlayerStorage : IStorage<Player, int>
    {
        Task<Dictionary<string, int>?> GetLeaderboardAsync();
    }
}