using CrossingCat.Domain.Interfaces;
using CrossingCats.Domains.Interfaces;
using CrossingCats.Infrastructure.Models;
using Microsoft.AspNetCore.SignalR;

namespace CrossingCatsAPI.Hubs
{
    public sealed class GameHub : Hub
    {
        private readonly IMatchService _matchService;
        private readonly IPlayerService _playerService;
        private readonly IGameManager<Player, Game> _gameManager;

        public GameHub(IMatchService matchService, IPlayerService playerService, IGameManager<Player, Game> gameManager)
        {
            _matchService = matchService;
            _playerService = playerService;
            _gameManager = gameManager;
        }

        public Task<string> JoinRoom(Player player)
        {
            return Task.Run(() =>
            {
                Groups.AddToGroupAsync(Context.ConnectionId, _gameManager.addPlayerInRoom(player));
                return _gameManager.addPlayerInRoom(player);
            });
        }

        public Task LeaveRoom(int roomNumber)
        {
            _gameManager.removeRoom(roomNumber);
            return Groups.RemoveFromGroupAsync(Context.ConnectionId, roomNumber.ToString());
        }
    }
}