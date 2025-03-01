using CrossingCat.Domain.Models.Responses;
using CrossingCats.Domains.Interfaces;
using CrossingCats.Infrastructure.Models;
using Microsoft.EntityFrameworkCore;

namespace CrossingCats.Infrastructure.Storages
{
    public class PlayerStorage : IPlayerStorage
    {
        private readonly CrossingCatContext _context;

        public PlayerStorage(CrossingCatContext context)
        {
            _context = context;
        }

        public async Task<DefaultResponse<Player>?> GetByIdAsync(int id)
        {
            Player? playerDb = await _context.Players.FirstOrDefaultAsync(x => x.AccountId == id);
            if(playerDb == null)
            {
                return new DefaultResponse<Player>()
                {
                    Message = "Player not found"
                };
            }
            return new DefaultResponse<Player>()
            {
                Message = "Player found",
                Value = playerDb
            };
        }
        public async Task<DefaultResponse<Player>?> AddAsync(Player player)
        {
            var entity = await _context.Players.AddAsync(player);
            if (await _context.SaveChangesAsync() > 0)
            {
                return new DefaultResponse<Player>()
                {
                    Message = "Player created",
                    Value = entity.Entity
                };
            }
            return new DefaultResponse<Player>()
            {
                Message = "Player not created"
            };
        }
        public async Task<bool> RemoveAsync(int id)
        {
            bool result = false;
            var playerDb = await _context.Players.FirstOrDefaultAsync(x => x.Id == id);
            if (playerDb != null)
            {
                _context.Players.Remove(playerDb);
                result = await _context.SaveChangesAsync() > 0;
            }
            return result;
        }
        public async Task<DefaultResponse<Player>?> UpdateAsync(Player player)
        {
            var toUpdate = (await GetByIdAsync(player.Id))?.Value;
            if (toUpdate == null)
            {
                return new DefaultResponse<Player>()
                {
                    Message = "Player not updated"
                };
            }
            var result = _context.Players.Update(toUpdate);
            await _context.SaveChangesAsync();
            return new DefaultResponse<Player>()
            {
                Message = "Player updated",
                Value = result.Entity
            };
        }

        public async Task<DefaultResponse<IEnumerable<Player>>?> GetAllAsync()
        {
            List<Player>? players = await _context.Players.ToListAsync();
            if (players == null || !players.Any())
            {
                return new DefaultResponse<IEnumerable<Player>>()
                {
                    Message = "No players found"
                };
            }
            return new DefaultResponse<IEnumerable<Player>>()
            {
                Message = "Players found",
                Value = players
            };
        }

        public async Task<Dictionary<string, int>?> GetLeaderboardAsync()
        {
            IQueryable<User>? usersDB = _context.Users.OrderByDescending(x => x.Score)
                                                            .Take(10);

            Dictionary<string, int> dataRecap = new();

            if (usersDB is not null)
            {
                foreach (User u in usersDB)
                {
                    dataRecap.Add(u.UserName, u.Score);
                }
                return dataRecap;
            }
            return null;
        }
    }
}