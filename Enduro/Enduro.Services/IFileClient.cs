using Enduro.Core;
using System;
using System.Collections.Generic;
using System.Text;

namespace Enduro.Services
{
    public interface IFileClient
    {
        void SaveFile(FilePath path, byte[] bytes);
        string GetUri(FilePath path);
    }
}
