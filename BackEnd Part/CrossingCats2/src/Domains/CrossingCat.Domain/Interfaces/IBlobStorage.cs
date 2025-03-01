using Microsoft.AspNetCore.Http;

namespace CrossingCats.Domains.Interfaces
{
    public interface IBlobStorage
    {
        Task UploadAsync(IFormFile file);
        Task DownloadImageAsync(string filename);
    }
}