using Marten.Services;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Enduro.Web.Insfrastructure
{
    /// <summary>
    /// Json serializer used when serializing objects to Marten.
    /// </summary>
    public class MartenJsonSerializer : JsonNetSerializer
    {
        public MartenJsonSerializer()
        {
            Customize(config =>
            {
                config.ContractResolver = new MartenJsonContractResolver();
                config.TypeNameHandling = TypeNameHandling.Auto;
                config.DateParseHandling = DateParseHandling.None;
                config.ConstructorHandling = ConstructorHandling.AllowNonPublicDefaultConstructor;
                config.MetadataPropertyHandling = MetadataPropertyHandling.ReadAhead;
            });
        }
    }
}
