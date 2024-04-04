using Postgrest.Models;
using Postgrest.Attributes;
using yankan.Utilities;

namespace yankan.Models;

[Table("users")]
public class User : BaseModel
{
    [PrimaryKey("id", false)]
    public Guid Id { get; set; }

    [Column("name")]
    public string Name { get; set; }

    [Column("email")]
    public string Email { get; set; }

    [Column("owned_boards")]
    public Guid[] OwnedBoards { get; set; }

    [Column("shared_boards")]
    public Guid[] SharedBoards { get; set; }

    [Column("created_at")]
    public DateTimeOffset CreatedAt { get; set; }
}
