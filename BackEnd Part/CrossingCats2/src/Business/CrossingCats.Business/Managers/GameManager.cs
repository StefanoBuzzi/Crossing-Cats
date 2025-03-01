using CrossingCats.Infrastructure.Models;
using CrossingCat.Domain.Interfaces;

namespace CrossingCats.Business.Managers
{
    public class GameManager : IGameManager<Player, Game>
    {
        private int numberOfRooms;
        private List<Game> games;
        
        public GameManager()
        {
            numberOfRooms = 0;
            games = new List<Game>();
        }

        public Game addRoom()
        {
            Game game = new Game();
            numberOfRooms++;
            games.Append(game);
            return game;
        }

        public void removeRoom(int roomNumber)
        {
            games.Remove(games.FirstOrDefault(x => x.RoomNumber == roomNumber));
        }

        public string addPlayerInRoom(Player player)
        {
            if(numberOfRooms == 0 || games.Last().Players.Count == 2 || games.Last().Players.Count == 0)
            {
                addRoom().Players.Add(player);
            }
            else
            {
                games.Last().Players.Add(player);
            }
            return games.Last().RoomNumber.ToString();
        }


    }
}