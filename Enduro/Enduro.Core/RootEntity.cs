using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Enduro.Core
{
    public abstract class RootEntity : IRootEntity
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public DateTime CreatedOnUtc { get; set; } = DateTime.UtcNow;
    }
}
