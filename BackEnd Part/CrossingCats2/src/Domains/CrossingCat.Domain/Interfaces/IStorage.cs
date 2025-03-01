using CrossingCat.Domain.Models.Responses;

namespace CrossingCats.Domains.Interfaces
{
    public interface IStorage<TEntity, TKey>
    {
        Task<DefaultResponse<TEntity>?> GetByIdAsync(TKey id);
        Task<DefaultResponse<TEntity>?> AddAsync(TEntity entity);
        Task<bool> RemoveAsync(TKey id);
        Task<DefaultResponse<TEntity>?> UpdateAsync(TEntity entity);
        Task<DefaultResponse<IEnumerable<TEntity>>?> GetAllAsync();
    }
}