using System;
using System.Collections.Generic;
using System.IO;
using Enduro.Core;
using Enduro.Services;
using Enduro.Services.Features.Users;

namespace Enduro.Web.Insfrastructure
{
    public class FileClient : IFileClient
    {
        public string BaseUrl { get; set; }
        public string BasePath { get; set; }

        public FileClient(IBootstrapperConfig config)
        {
            BaseUrl = config.BaseUrl;
            BasePath = config.BasePath;
        }

        public string GetUri(FilePath path)
        {
            return $"{BaseUrl}/{path.Container}/{path.File}";   
        }

        public void SaveFile(FilePath path, byte[] fileAsByteArray)
        {
            var containerPath = Path.Combine(BasePath, path.Container);
            var filePath = Path.Combine(containerPath, path.File);
            Directory.CreateDirectory(containerPath);
            File.WriteAllBytes(filePath, fileAsByteArray);
        }
    }
}
