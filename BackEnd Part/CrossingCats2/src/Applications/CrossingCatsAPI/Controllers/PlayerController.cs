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
    public class PlayerController : Controller
    {
        private readonly IPlayerService _player;

        public PlayerController(IPlayerService player)
        {
            _player = player;
        }

        [HttpGet("GetPlayerById")]
        public async Task<DefaultResponse<PlayerDto>?> GetPlayerAsync([FromQuery] int id)
        {
            return await _player.GetByIdAsync(id);
        }

        [HttpPost("CreatePlayer")]
        public async Task<DefaultResponse<PlayerDto>?> CreatePlayerAsync([FromBody] PlayerDto player)
        {
            return await _player.CreateAsync(player);
        }

        [HttpDelete("DeletePlayer")]
        public async Task<bool> DeletePLayerAsync([FromQuery] int id)
        {
            return await _player.RemoveAsync(id);
        }

        [HttpPut("UpdatePlayer")]
        public async Task<DefaultResponse<PlayerDto>?> UpdatePlayerAsync([FromBody] PlayerDto player)
        {
            return await _player.UpdateAsync(player);
        }

        [HttpGet("GetAllPlayers")]
        public async Task<DefaultResponse<IEnumerable<PlayerDto>>?> GetAllUsersAsync()
        {
            return await _player.GetAllAsync();
        }

        [HttpGet("GetLeaderboard")]
        public async Task<Dictionary<string, int>?> GetLeaderboard()
        {
            return await _player.GetLeaderboardAsync();
        }
    }
}