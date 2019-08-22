using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System.Reflection;

namespace Enduro.Web.Insfrastructure
{
    /// <summary>
    /// Special contract resolver to create objects bypassing constructor call and being able to deserialize fields 
    /// to private set properties.
    /// </summary>
    public class MartenJsonContractResolver : DefaultContractResolver
    {
        protected override JsonProperty CreateProperty(MemberInfo member, MemberSerialization memberSerialization)
        {
            var prop = base.CreateProperty(member, memberSerialization);

            // Make property member with private set method writable, so it can be deserialized.
            if (!prop.Writable)
            {
                var property = member as PropertyInfo;
                if (property != null)
                {
                    var hasPrivateSetter = property.GetSetMethod(true) != null;
                    prop.Writable = hasPrivateSetter;
                }
            }

            return prop;
        }
    }
}
