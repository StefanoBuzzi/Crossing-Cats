using CrossingCat.Domain.Models.Responses;
using CrossingCats.Business.Mapper;
using CrossingCats.Domains.Models;
using CrossingCats.Domains.Interfaces;
using CrossingCats.Infrastructure.Models;

namespace CrossingCats.Business.Services
{
    internal class PlayerService : IPlayerService
    {
        private readonly IPlayerStorage _playerStorage;

        public PlayerService(IPlayerStorage playerStorage)
        {
            _playerStorage = playerStorage;
        }
        public async Task<DefaultResponse<PlayerDto>?> GetByIdAsync(int id)
        {
            DefaultResponse<Player>? getPlayer = await _playerStorage.GetByIdAsync(id);
            if (getPlayer?.Value == null)
            {
                return new DefaultResponse<PlayerDto>()
                {
                    Message = getPlayer.Message
                };
            }
            return new DefaultResponse<PlayerDto>()
            {
                Message = getPlayer.Message,
                Value = DtoMapper.Map(getPlayer.Value)
            };
        }
        public async Task<DefaultResponse<PlayerDto>?> CreateAsync(PlayerDto playerDto)
        {
            DefaultResponse<Player>? createPlayer = await _playerStorage.AddAsync(DtoMapper.Map(playerDto));
            if (createPlayer.Value == null)
            {
                return new DefaultResponse<PlayerDto>() 
                {
                    Message = createPlayer.Message,
                };
            }
            return new DefaultResponse<PlayerDto>()
            {
                Message = createPlayer.Message,
                Value = DtoMapper.Map(createPlayer.Value)
            };
        }
        public async Task<DefaultResponse<PlayerDto>?> UpdateAsync(PlayerDto playerDto)
        {
            DefaultResponse<Player>? updatePlayer = await _playerStorage.UpdateAsync(DtoMapper.Map(playerDto));
            if (updatePlayer.Value == null)
            {
                return new DefaultResponse<PlayerDto>()
                {
                    Message = updatePlayer.Message
                };
            }
            return new DefaultResponse<PlayerDto>()
            {
                Message = updatePlayer.Message,
                Value = DtoMapper.Map(updatePlayer.Value)
            };
        }
        public async Task<bool> RemoveAsync(int id)
        {
            return await _playerStorage.RemoveAsync(id);
        }

        public async Task<DefaultResponse<IEnumerable<PlayerDto>>?> GetAllAsync()
        {
            DefaultResponse<IEnumerable<Player>> playersList = await _playerStorage.GetAllAsync();
            if (playersList.Message == "No players found")
            {
                return new DefaultResponse<IEnumerable<PlayerDto>>()
                {
                    Message = playersList.Message
                };
            }
            IEnumerable<PlayerDto> result = new List<PlayerDto>();
            foreach (var item in playersList.Value)
            {
                result.Append(DtoMapper.Map(item));
            }
            return new DefaultResponse<IEnumerable<PlayerDto>>()
            {
                Message = playersList.Message,
                Value = result
            };
        }

        public async Task<Dictionary<string, int>?> GetLeaderboardAsync()
        {
            return await _playerStorage.GetLeaderboardAsync();
        }
    }
}