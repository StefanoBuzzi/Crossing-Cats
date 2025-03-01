namespace CrossingCat.Domain.Models.Responses
{
    public class DefaultResponse<TEntity>
    {
        public required string Message { get; set; }
        public TEntity? Value { get; set; }
    }
}