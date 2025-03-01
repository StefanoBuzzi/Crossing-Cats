using CrossingCats.Domains.Models;
using CrossingCats.Infrastructure.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CrossingCats.Business.Mapper
{
    internal class DtoMapper
    {
        public static Player Map(PlayerDto playerDto)
        {
            return new Player()
            {
                Id = playerDto.Id,
                AccountId = playerDto.AccountId,
                GameId = playerDto.GameId
            };
        }
        public static PlayerDto Map(Player player)
        {
            return new PlayerDto()
            {
                Id = player.Id,
                AccountId = player.AccountId,
                GameId = player.GameId
            };
        }
        public static User Map(UserDto userDto)
        {
            return new User()
            {
                Id = userDto.Id,
                Score = userDto.Score,
                Email = userDto.Email,
                Password = userDto.Password,
                UserName = userDto.UserName
            };
        }
        public static UserDto Map(User user)
        {
            return new UserDto()
            {
                Id = user.Id,
                Score = user.Score,
                Email = user.Email,
                Password = user.Password,
                UserName = user.UserName
            };
        }

        public static Game Map(GameDto gameDto)
        {
            return new Game()
            {
                Id = gameDto.Id,
                RoomNumber = gameDto.RoomNumber
            };
        }
        public static GameDto Map(Game game)
        {
            return new GameDto()
            {
                Id = game.Id,
                RoomNumber = game.RoomNumber
            };
        }
    }
}
