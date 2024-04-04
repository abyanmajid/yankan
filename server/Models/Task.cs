using Postgrest.Models;
using Postgrest.Attributes;
using yankan.Utilities;

namespace yankan.Models;

[Table("tasks")]
public class Task : BaseModel
{
    [PrimaryKey("id", false)]
    public Guid Id { get; set; }

    [Column("creator")]
    public Guid Creator { get; set; }

    [Column("type")]
    public string Type { get; set; }

    [Column("task_statement")]
    public string TaskStatement { get; set; }

    [Column("assignees")]
    public Guid[] Assignees { get; set; }

    [Column("due")]
    public DateTimeOffset Due { get; set; }

    [Column("created_at")]
    public DateTimeOffset CreatedAt { get; set; }
}
