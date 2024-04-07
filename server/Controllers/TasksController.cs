using Microsoft.AspNetCore.Mvc;
using Supabase;
using System.Linq;
using System.Threading.Tasks;
using yankan.Models;
using yankan.Requests;
using Microsoft.AspNetCore.Cors;

namespace yankan.Controllers
{
    [EnableCors("MyAllowSpecificOrigins")]
    [ApiController]
    [Route("[controller]")]
    public class TaskController : ControllerBase
    {
        private readonly Supabase.Client client;

        public TaskController(Supabase.Client supabase)
        {
            client = supabase;
        }

        [HttpGet("/tasks")]
        public async Task<IActionResult> GetAllTasks()
        {

            try
            {
                var result = await client.From<Models.Task>().Get();
                var tasks = result.Models;
                return Ok(tasks);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred while fetching tasks: {ex.Message}");
                return StatusCode(500, "An error occurred while fetching tasks.");
            }
        }

        [DisableCors]
        [HttpPost("/tasks")]
        public async Task<IActionResult> CreateTask([FromBody] CreateTaskRequest request)
        {
            var task = new Models.Task
            {
                Creator = request.Creator,
                Type = request.Type,
                TaskStatement = request.TaskStatement,
                Assignees = request.Assignees,
                Due = request.Due
            };

            var response = await client.From<Models.Task>().Insert(task);
            var newTask = response.Models.FirstOrDefault();

            if (newTask != null)
            {
                return Ok(newTask);
            }
            else
            {
                return StatusCode(500, "Failed to create the task."); // Handle failure case 
            }
        }

        [HttpGet("/tasks/{id}")]
        public async Task<IActionResult> GetTaskById(Guid id)
        {
            try
            {
                var result = await client
                    .From<Models.Task>()
                    .Select("*")
                    .Where(task => task.Id == id)
                    .Get();

                if (result == null)
                {
                    return NotFound($"Task with ID {id} not found.");
                }

                var task = result.Model;
                return Ok(task);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred while fetching the task with ID {id}: {ex.Message}");
                return StatusCode(500, $"An error occurred while fetching the task with ID {id}.");
            }
        }

        [HttpPut("/tasks/{id}")]
        public async Task<IActionResult> UpdateTaskById(Guid id, [FromBody] CreateTaskRequest request)
        {
            try
            {
                var model = await client
                    .From<Models.Task>()
                    .Where(task => task.Id == id)
                    .Single();

                if (model == null)
                {
                    return NotFound($"Task with ID {id} not found.");
                }

                model.Creator = request.Creator;
                model.Type = request.Type;
                model.TaskStatement = request.TaskStatement;
                model.Assignees = request.Assignees;
                model.Due = request.Due;

                await model.Update<Models.Task>();
                return Ok($"Successfully created new task with ID: {id}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred while updating the task with ID {id}: {ex.Message}");
                return StatusCode(500, $"An error occurred while updating the task with ID {id}.");
            }

        }

        [HttpDelete("/tasks/{id}")]
        public async Task<IActionResult> DeleteTaskById(Guid id)
        {
            try
            {
                await client
                    .From<Models.Task>()
                    .Where(task => task.Id == id)
                    .Delete();

                return Ok($"Successfully deleted new task with ID: {id}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred while deleting the task with ID {id}: {ex.Message}");
                return StatusCode(500, $"An error occurred while deleting the task with ID {id}.");
            }
        }
    }
}
