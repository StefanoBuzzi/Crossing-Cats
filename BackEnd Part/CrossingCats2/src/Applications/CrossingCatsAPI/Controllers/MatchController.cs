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
    public class MatchController : Controller
    {
        private readonly IMatchService _match;

        public MatchController(IMatchService match)
        {
            _match = match;
        }

        [HttpGet("GetGameById")]
        public async Task<DefaultResponse<GameDto>?> GetGameAsync([FromQuery] int id)
        {
            return await _match.GetByIdAsync(id);
        }

        [HttpPost("CreateGame")]
        public async Task<DefaultResponse<GameDto>?> CreateGameAsync([FromBody] GameDto game)
        {
            return await _match.CreateAsync(game);
        }

        [HttpDelete("DeleteGame")]
        public async Task<bool> DeleteGameAsync([FromQuery] int id)
        {
            return await _match.RemoveAsync(id);
        }

        [HttpPut("UpdateGame")]
        public async Task<DefaultResponse<GameDto>?> UpdateGameAsync([FromBody] GameDto game)
        {
            return await _match.UpdateAsync(game);
        }

        [HttpGet("GetAllGames")]
        public async Task<DefaultResponse<IEnumerable<GameDto>>?> GetAllGamesAsync()
        {
            return await _match.GetAllAsync();
        }

        [HttpGet("GameRecap")]
        public async Task<Dictionary<string, int>?> GetGameRecapAsync(int id)
        {
            return await _match.GetGameRecapAsync(id);
        }
    }
}