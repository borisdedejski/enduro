using System;
using System.Collections.Generic;
using System.Text;

namespace Enduro.Core
{
    public class FilePath
    {
        public string Container { get; set; }
        public string File { get; set; }

        public FilePath()
        {
            
        }

        public FilePath(string container, string file)
        {
            Container = container;
            File = file;
        }
    }
}
