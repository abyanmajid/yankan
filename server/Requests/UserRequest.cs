namespace yankan.Requests;

public class CreateUserRequest
{
    public string Name { get; set; }
    public string Email { get; set; }
    public Guid[] OwnedBoards { get; set; }
    public Guid[] SharedBoards { get; set; }
}

public class UserResponse
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public Guid[] OwnedBoards { get; set; }
    public Guid[] SharedBoards { get; set; }
    public DateTimeOffset CreatedAt { get; set; }
}
