using CrossingCat.Domain.Models.Responses;

namespace CrossingCat.Domain.Interfaces
{
    public interface IService<TEntity, TKey> where TEntity : class
    {
        Task<DefaultResponse<TEntity>?> GetByIdAsync(TKey id);
        Task<DefaultResponse<TEntity>?> CreateAsync(TEntity entity);
        Task<bool> RemoveAsync(TKey id);
        Task<DefaultResponse<TEntity>?> UpdateAsync(TEntity entity);
        Task<DefaultResponse<IEnumerable<TEntity>>?> GetAllAsync();
    }
}