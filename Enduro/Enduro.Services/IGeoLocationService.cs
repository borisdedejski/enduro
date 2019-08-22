using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Enduro.Services
{
    public interface IGeoLocationService
    {
        Task GeocodeAsync(string address);
    }
}
