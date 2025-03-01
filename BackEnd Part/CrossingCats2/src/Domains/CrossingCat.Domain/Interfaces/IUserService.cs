using CrossingCat.Domain.Interfaces;
using CrossingCats.Domains.Models;

namespace CrossingCats.Domains.Interfaces
{
    public interface IUserService : IService<UserDto, int>
    {
        
    }
}