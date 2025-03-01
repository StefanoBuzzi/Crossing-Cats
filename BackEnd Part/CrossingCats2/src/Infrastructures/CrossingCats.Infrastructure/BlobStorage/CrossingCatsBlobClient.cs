using CrossingCats.Domains.Interfaces;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Microsoft.AspNetCore.Http;

namespace CrossingCats.Infrastructure.BlobStorage
{
    public class CrossingCatsBlobClient : IBlobStorage
    {
        private BlobServiceClient _blobServiceClient;
        private readonly string _containerName;

        public CrossingCatsBlobClient(string containerName, BlobServiceClient blobServiceClient)
        {
            _blobServiceClient = blobServiceClient;
            _containerName = containerName;
        }

        public async Task UploadAsync(IFormFile file)
        {
            BlobContainerClient containerClient = _blobServiceClient.GetBlobContainerClient(_containerName);
            BlobClient blobClient = containerClient.GetBlobClient(file.FileName);
            using (var uploadFileStream = file.OpenReadStream())
            {
                await blobClient.UploadAsync(uploadFileStream, true);
                uploadFileStream.Close();
            }
        }

        public async Task DownloadImageAsync(string filename)
        {
            string filepath = "C:\\Test\\policecar.png";
            BlobContainerClient containerClient = _blobServiceClient.GetBlobContainerClient(_containerName);
            BlobClient blob = containerClient.GetBlobClient(filename);
            BlobDownloadInfo blobData = await blob.DownloadAsync();

            using (FileStream downloadFileStream = File.OpenWrite(filepath))
            {
                await blobData.Content.CopyToAsync(downloadFileStream);
                downloadFileStream.Close();
            }
        }

    }
}  