namespace yankan.Requests;

public class CreateTaskRequest
{
    public Guid Creator { get; set; }
    public string Type { get; set; }
    public string TaskStatement { get; set; }
    public Guid[] Assignees { get; set; }
    public DateTimeOffset Due { get; set; }
}

public class TaskResponse
{
    public Guid Id { get; set; }
    public Guid Creator { get; set; }
    public string Type { get; set; }
    public string TaskStatement { get; set; }
    public Guid[] Assignees { get; set; }
    public DateTimeOffset Due { get; set; }
    public DateTimeOffset CreatedAt { get; set; }
}
