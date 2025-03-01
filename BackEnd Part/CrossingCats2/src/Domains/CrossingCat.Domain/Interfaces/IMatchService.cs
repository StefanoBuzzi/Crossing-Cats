using CrossingCat.Domain.Interfaces;
using CrossingCats.Domains.Models;

namespace CrossingCats.Domains.Interfaces
{
    public interface IMatchService : IService<GameDto, int>
    {
        Task<Dictionary<string, int>?> GetGameRecapAsync(int id);
    }
}