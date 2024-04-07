namespace yankan.Requests;

public class CreateTaskRequest
{
    public string Creator { get; set; }
    public string Type { get; set; }
    public string TaskStatement { get; set; }
    public string[] Assignees { get; set; }
    public DateTimeOffset Due { get; set; }
}

public class TaskResponse
{
    public Guid Id { get; set; }
    public string Creator { get; set; }
    public string Type { get; set; }
    public string TaskStatement { get; set; }
    public string[] Assignees { get; set; }
    public DateTimeOffset Due { get; set; }
    public DateTimeOffset CreatedAt { get; set; }
}
