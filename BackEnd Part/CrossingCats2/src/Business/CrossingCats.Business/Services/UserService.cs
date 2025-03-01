using CrossingCat.Domain.Models.Responses;
using CrossingCats.Business.Mapper;
using CrossingCats.Domains.Models;
using CrossingCats.Domains.Interfaces;
using CrossingCats.Infrastructure.Models;

namespace CrossingCats.Business.Services
{
    internal class UserService : IUserService
    {
        private readonly IStorage<User, int> _userStorage;

        public UserService(IStorage<User, int> userStorage)
        {
            _userStorage = userStorage;
        }

        public async Task<DefaultResponse<UserDto>?> GetByIdAsync(int id)
        {
            DefaultResponse<User>? getUser = await _userStorage.GetByIdAsync(id);
            if (getUser.Value == null)
            {
                return new DefaultResponse<UserDto>()
                {
                    Message = getUser.Message
                };
            }
            return new DefaultResponse<UserDto>()
            {
                Message = getUser.Message,
                Value = DtoMapper.Map(getUser.Value)
            };
        }
        public async Task<DefaultResponse<UserDto>?> CreateAsync(UserDto userDto)
        {
            DefaultResponse<User>? createUser = await _userStorage.AddAsync(DtoMapper.Map(userDto));
            if (createUser.Value == null)
            {
                return new DefaultResponse<UserDto>()
                {
                    Message = createUser.Message
                };
            }
            return new DefaultResponse<UserDto>()
            {
                Message = createUser.Message,
                Value = DtoMapper.Map(createUser.Value)
            };
        }
        public async Task<DefaultResponse<UserDto>?> UpdateAsync(UserDto userDto)
        {
            DefaultResponse<User>? updateUser = await _userStorage.UpdateAsync(DtoMapper.Map(userDto));
            if (updateUser.Value == null)
            {
                return new DefaultResponse<UserDto>()
                {
                    Message = updateUser.Message
                };
            }
            return new DefaultResponse<UserDto>()
            {
                Message = updateUser.Message,
                Value = DtoMapper.Map(updateUser.Value)
            };
        }
        public async Task<bool> RemoveAsync(int id)
        {
            return await _userStorage.RemoveAsync(id);
        }

        public async Task<DefaultResponse<IEnumerable<UserDto>>?> GetAllAsync()
        {
            DefaultResponse<IEnumerable<User>> usersList = await _userStorage.GetAllAsync();
            if(usersList.Message == "No users found")
            {
                return new DefaultResponse<IEnumerable<UserDto>>()
                {
                    Message = usersList.Message
                };
            }
            IEnumerable<UserDto> result = new List<UserDto>();
            foreach (var item in usersList.Value)
            {
                result.Append(DtoMapper.Map(item));
            }
            return new DefaultResponse<IEnumerable<UserDto>>()
            {
                Message = usersList.Message,
                Value = result
            };
        }

        //public async Task<string[]> LoginAsync(string email, string password)
        //{
        //    string[] result = new string[3];
        //    result[2] = "Wrong email and password";

        //    User? userDb = await _context.Users.FirstOrDefaultAsync(x => x.Email == email);
        //    if (userDb != null)
        //    {
        //        if (userDb.Password == password)
        //        {
        //            result[0] = userDb.UserName;
        //            result[1] = ""+userDb.Id;
        //            result[2] = "Login successful";
        //        }
        //        else
        //        {
        //            result[2] = "Wrong password";
        //        }
        //    }
        //    return result;
        //}
    }
}