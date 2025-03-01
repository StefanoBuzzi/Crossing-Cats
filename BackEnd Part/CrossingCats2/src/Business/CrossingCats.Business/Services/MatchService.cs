using CrossingCat.Domain.Models.Responses;
using CrossingCats.Business.Mapper;
using CrossingCats.Domains.Models;
using CrossingCats.Domains.Interfaces;
using CrossingCats.Infrastructure.Models;

namespace CrossingCats.Business.Services
{
    internal class MatchService : IMatchService
    {
        private readonly IGameStorage _gameStorage;

        public MatchService(IGameStorage gameStorage)
        {
            _gameStorage = gameStorage;
        }
        public async Task<DefaultResponse<GameDto>?> GetByIdAsync(int id)
        {
            DefaultResponse<Game>? getGame = await _gameStorage.GetByIdAsync(id);
            if (getGame.Value == null)
            {
                return new DefaultResponse<GameDto>()
                {
                    Message = getGame.Message
                };
            }
            return new DefaultResponse<GameDto>()
            {
                Message = getGame.Message,
                Value = DtoMapper.Map(getGame.Value)
            };
        }
        public async Task<DefaultResponse<GameDto>?> CreateAsync(GameDto gameDto)
        {
            DefaultResponse<Game>? createGame = await _gameStorage.AddAsync(DtoMapper.Map(gameDto));
            if (createGame.Value == null)
            {
                return new DefaultResponse<GameDto>()
                {
                    Message = createGame.Message
                };
            }
            return new DefaultResponse<GameDto>()
            {
                Message = createGame.Message,
                Value = DtoMapper.Map(createGame.Value)
            };
        }
        public async Task<DefaultResponse<GameDto>?> UpdateAsync(GameDto gameDto)
        {
            DefaultResponse<Game>? updateGame = await _gameStorage.UpdateAsync(DtoMapper.Map(gameDto));
            if (updateGame.Value == null)
            {
                return new DefaultResponse<GameDto>()
                {
                    Message = updateGame.Message,
                };
            }
            return new DefaultResponse<GameDto>()
            {
                Message = updateGame.Message,
                Value = DtoMapper.Map(updateGame.Value)
            };
        }
        public async Task<bool> RemoveAsync(int id)
        {
            return await _gameStorage.RemoveAsync(id);
        }

        public async Task<DefaultResponse<IEnumerable<GameDto>>?> GetAllAsync()
        {
            DefaultResponse<IEnumerable<Game>> gamesList = await _gameStorage.GetAllAsync();
            if (gamesList.Message == "No games found")
            {
                return new DefaultResponse<IEnumerable<GameDto>>()
                {
                    Message = gamesList.Message
                };
            }
            IEnumerable<GameDto> result = new List<GameDto>();
            foreach (var item in gamesList.Value)
            {
                result.Append(DtoMapper.Map(item));
            }
            return new DefaultResponse<IEnumerable<GameDto>>()
            {
                Message = gamesList.Message,
                Value = result
            };
        }

        public async Task<Dictionary<string, int>?> GetGameRecapAsync(int id)
        {
            return await _gameStorage.GetGameRecapAsync(id);
        }
    }
}