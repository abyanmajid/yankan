namespace yankan.Requests;
  
public class CreateBoardRequest {
    public string Name { get; set; }
    public Guid[] Members { get; set; }
    public Guid[] Tasks { get; set; }
}

public class CreateBoardResponse {
    public Guid Id { get; set; }
    public string Name { get; set; }
    public Guid[] Members { get; set; }
    public Guid[] Tasks { get; set; }
    public DateTimeOffset CreatedAt { get; set; }
}