using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Enduro.Core
{
    public interface IRootEntity
    {
        Guid Id { get; set; }
        DateTime CreatedOnUtc { get; set; }
    }
}
