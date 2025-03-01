using CrossingCat.Domain.Models.Responses;
using CrossingCats.Domains.Interfaces;
using CrossingCats.Infrastructure.Models;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;

namespace CrossingCats.Infrastructure.Storages
{
    public class UserStorage : IStorage<User, int>
    {
        private readonly CrossingCatContext _context;

        public UserStorage(CrossingCatContext context)
        {
            _context = context;
        }

        public async Task<DefaultResponse<User>?> GetByIdAsync(int id)
        {
            User? userDb = await _context.Users.FirstOrDefaultAsync(x => x.Id == id);
            if (userDb == null)
            {
                return new DefaultResponse<User>()
                {
                    Message = "User not found"
                };
            }
            return new DefaultResponse<User>()
            {
                Message = "User found",
                Value = userDb
            };
        }

        public async Task<DefaultResponse<User>?> AddAsync(User user)
        {
            string rgxEmail = @"^[\w!#$%&'*+\-/=?\^_`{|}~]+(\.[\w!#$%&'*+\-/=?\^_`{|}~]+)*"
                                   + "@"
                                   + @"((([\-\w]+\.)+[a-zA-Z]{2,4})|(([0-9]{1,3}\.){3}[0-9]{1,3}))\z";

            string rgxPassword = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$";
            var entity = await _context.Users.AddAsync(user);

            if (Regex.IsMatch(user.Email, rgxEmail))
            {
                if ((Regex.IsMatch(user.Password, rgxPassword)))
                {
                    int found = 0;
                    if (entity != null)
                    {
                        foreach (var item in _context.Users)
                        {
                            if (entity.Entity.UserName != item.UserName)
                            {
                                if (entity.Entity.Email == item.Email)
                                {
                                    found = 1;
                                    return new DefaultResponse<User>()
                                    {
                                        Message = "Email already in use"
                                    };
                                }
                            }
                            else
                            {
                                found = 2;
                                return new DefaultResponse<User>()
                                {
                                    Message = "Username already in use"
                                };
                            }
                        }
                        if (found == 0)
                        {
                            await _context.SaveChangesAsync();
                            return new DefaultResponse<User>()
                            {
                                Message = "User created",
                                Value = entity.Entity
                            };
                        }
                    }
                    else
                    {
                        return new DefaultResponse<User>()
                        {
                            Message = "User not created"
                        };
                    }
                }
                return new DefaultResponse<User>()
                {
                    Message = "Password sintax error!!"
                };
            }
            else
            {
                return new DefaultResponse<User>()
                {
                    Message = "Email sintax error!!"
                };
            }
        }

        public async Task<bool> RemoveAsync(int id)
        {
            bool result = false;
            var userDb = await _context.Users.FirstOrDefaultAsync(x => x.Id == id);
            if (userDb != null)
            {
                _context.Users.Remove(userDb);
                result = await _context.SaveChangesAsync() > 0;
            }
            return result;
        }
        public async Task<DefaultResponse<User>?> UpdateAsync(User user)
        {
            var toUpdate = (await GetByIdAsync(user.Id))?.Value;
            if (toUpdate == null)
            {
                return new DefaultResponse<User>()
                {
                    Message = "User not updated"
                };
            }
            toUpdate.UserName = user.UserName;
            toUpdate.Email = user.Email;
            toUpdate.Password = user.Password;
            toUpdate.Score = user.Score;
            var result = _context.Users.Update(toUpdate);
            await _context.SaveChangesAsync();
            return new DefaultResponse<User>()
            {
                Message = "User updated",
                Value = result.Entity
            };
        }

        public async Task<DefaultResponse<IEnumerable<User>>?> GetAllAsync()
        {
            List<User>? users = await _context.Users.ToListAsync();
            if(users == null || !users.Any())
            {
                return new DefaultResponse<IEnumerable<User>>()
                {
                    Message = "No users found"
                };
            }
            return new DefaultResponse<IEnumerable<User>>()
            {
                Message = "Users found",
                Value = users
            };
        }
    }
}