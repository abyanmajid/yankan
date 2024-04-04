using Postgrest.Models;
using Postgrest.Attributes;
using yankan.Utilities;

namespace yankan.Models;

[Table("boards")]
public class Board : BaseModel
{
    [PrimaryKey("id", false)]
    public Guid Id { get; set; }

    [Column("name")]
    public string Name { get; set; }

    [Column("members")]
    public Guid[] Members { get; set; }

    [Column("tasks")]
    public Guid[] Tasks { get; set; }

    [Column("created_at")]
    public DateTimeOffset CreatedAt { get; set; }
}
