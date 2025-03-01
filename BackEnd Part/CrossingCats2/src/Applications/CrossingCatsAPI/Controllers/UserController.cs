using CrossingCat.Domain.Models.Responses;
using CrossingCats.Domains.Models;
using CrossingCats.Domains.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace CrossingCatsAPI.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly IUserService _user;

        public UserController(IUserService user)
        {
            _user = user;
        }

        [HttpGet("GetUserById")]
        public async Task<DefaultResponse<UserDto>?> GetUserAsync([FromQuery] int id)
        {
            return await _user.GetByIdAsync(id);
        }

        [HttpPost("CreateUser")]
        public async Task<DefaultResponse<UserDto>?> CreateUserAsync([FromBody] UserDto user)
        {
            return await _user.CreateAsync(user);
        }

        [HttpDelete("DeleteUser")]
        public async Task<bool> DeleteUserAsync([FromQuery] int id)
        {
            return await _user.RemoveAsync(id);
        }

        [HttpPut("UpdateUser")]
        public async Task<DefaultResponse<UserDto>?> UpdateUserAsync([FromBody] UserDto user)
        {
            return await _user.UpdateAsync(user);
        }

        [HttpGet("GetAllUsers")]
        public async Task<DefaultResponse<IEnumerable<UserDto>>?> GetAllUsersAsync()
        {
            return await _user.GetAllAsync();
        }
    }
}