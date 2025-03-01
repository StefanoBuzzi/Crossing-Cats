using CrossingCats.Domains.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CrossingCatsAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BlobController : ControllerBase
    {
        private readonly IBlobStorage _blob;

        public BlobController(IBlobStorage blob)
        {
            _blob = blob;
        }

        [HttpPut("UploadBlobData")]
        public async Task UploadAsync(IFormFile file)
        {
            await _blob.UploadAsync(file);
        }

        [HttpGet("DownloadBlobData")]
        public async Task DownloadImageAsync(string filename)
        {
            await _blob.DownloadImageAsync(filename);
        }
    }
}