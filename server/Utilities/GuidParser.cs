using System;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace yankan.Utilities;

public class GuidArrayConverter : JsonConverter<Guid[]>
{
    public override Guid[] Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        // Implement custom deserialization logic if needed
        throw new NotImplementedException();
    }

    public override void Write(Utf8JsonWriter writer, Guid[] value, JsonSerializerOptions options)
    {
        writer.WriteStartArray();

        foreach (var guid in value)
        {
            writer.WriteStringValue(guid.ToString());
        }

        writer.WriteEndArray();
    }
}
