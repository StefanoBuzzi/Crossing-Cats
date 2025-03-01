using CrossingCat.Domain.Interfaces;
using CrossingCats.Domains.Models;

namespace CrossingCats.Domains.Interfaces
{
    public interface IPlayerService : IService<PlayerDto, int>
    {
        Task<Dictionary<string, int>?> GetLeaderboardAsync();
    }
}