namespace CrossingCat.Domain.Interfaces
{
    public interface IGameManager<TKey, TKey2>
    {
        public TKey2 addRoom();
        public void removeRoom(int roomNumber);
        public string addPlayerInRoom(TKey player);
    }
}