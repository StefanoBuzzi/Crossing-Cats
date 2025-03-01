using CrossingCat.Domain.Models.Responses;
using CrossingCats.Domains.Interfaces;
using CrossingCats.Infrastructure.Models;
using Microsoft.EntityFrameworkCore;

namespace CrossingCats.Infrastructure.Storages
{
    public class GameStorage : IGameStorage
    {
        private readonly CrossingCatContext _context;

        public GameStorage(CrossingCatContext context)
        {
            _context = context;
        }

        public async Task<DefaultResponse<Game>?> GetByIdAsync(int id)
        {
            Game? gameDb = await _context.Games.FirstOrDefaultAsync(x => x.Id == id);
            if (gameDb == null)
            {
                return new DefaultResponse<Game>()
                {
                    Message = "Game not found"
                };
            }
            return new DefaultResponse<Game>()
            {
                Message = "Game found",
                Value = gameDb
            };
        }
        public async Task<DefaultResponse<Game>?> AddAsync(Game game)
        {
            var entity = await _context.Games.AddAsync(game);
            if (await _context.SaveChangesAsync() > 0)
            {
                return new DefaultResponse<Game>()
                {
                    Message = "Game created",
                    Value = entity.Entity
                };
            }
            return new DefaultResponse<Game>()
            {
                Message = "Game not created"
            };
        }
        public async Task<DefaultResponse<Game>?> UpdateAsync(Game game)
        {
            var toUpdate = (await GetByIdAsync(game.Id))?.Value;
            if (toUpdate == null)
            {
                return new DefaultResponse<Game>()
                {
                    Message = "Game not updated"
                };
            }
            toUpdate.RoomNumber = game.RoomNumber;
            var result = _context.Games.Update(toUpdate);
            await _context.SaveChangesAsync();
            return new DefaultResponse<Game>()
            {
                Message = "Game updated",
                Value = result.Entity
            };
        }
        public async Task<bool> RemoveAsync(int id)
        {
            bool result = false;
            var gameDb = await _context.Games.FirstOrDefaultAsync(x => x.Id == id);
            if (gameDb != null)
            {
                _context.Games.Remove(gameDb);
                result = await _context.SaveChangesAsync() > 0;
            }
            return result;
        }
        public async Task<DefaultResponse<IEnumerable<Game>>?> GetAllAsync()
        {
            List<Game>? games = await _context.Games.ToListAsync();
            if (games == null || !games.Any())
            {
                return new DefaultResponse<IEnumerable<Game>>()
                {
                    Message = "No games found"
                };
            }
            return new DefaultResponse<IEnumerable<Game>>()
            {
                Message = "Games found",
                Value = games
            };
        }

        public async Task<Dictionary<string, int>?> GetGameRecapAsync(int id)
        {
            IQueryable<Player>? playersDB = _context.Players.Where(x => x.GameId == id)
                                                             .Include(x => x.Account);
            if (playersDB is not null)
            {
                Dictionary<string, int> dataRecap = new Dictionary<string, int>();

                foreach (Player p in playersDB)
                {
                    dataRecap.Add(p.Account.UserName, p.Account.Score);
                }
                return dataRecap;
            }
            return null;
        }
    }
}