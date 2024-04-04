using Microsoft.AspNetCore.Mvc;
using Supabase;
using System.Linq;
using System.Threading.Tasks;
using yankan.Models;
using yankan.Requests;

namespace yankan.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly Supabase.Client client;

        public UserController(Supabase.Client supabase)
        {
            client = supabase;
        }

        [HttpGet("/users")]
        public async Task<IActionResult> GetAllUsers()
        {
            try
            {
                var result = await client.From<User>().Get();
                var users = result.Models;
                return Ok(users);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred while fetching users: {ex.Message}");
                return StatusCode(500, "An error occurred while fetching users.");
            }
        }

        [HttpPost("/users")]
        public async Task<IActionResult> CreateUser([FromBody] CreateUserRequest request)
        {
            var user = new User
            {
                Name = request.Name,
                Email = request.Email,
                OwnedBoards = request.OwnedBoards,
                SharedBoards = request.SharedBoards,
            };

            var response = await client.From<User>().Insert(user);
            var newUser = response.Models.FirstOrDefault();

            if (newUser != null)
            {
                return Ok($"Successfully created new user with ID: {newUser.Id}");
            }
            else
            {
                return StatusCode(500, "Failed to create the user.");
            }
        }

        [HttpGet("/users/{id}")]
        public async Task<IActionResult> GetUserById(Guid id)
        {
            try
            {
                var result = await client
                    .From<User>()
                    .Select("*")
                    .Where(user => user.Id == id)
                    .Get();

                if (result == null)
                {
                    return NotFound($"User with ID {id} not found.");
                }

                var user = result.Model;

                return Ok(user);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred while fetching the user with ID {id}: {ex.Message}");
                return StatusCode(500, $"An error occurred while fetching the user with ID {id}.");
            }
        }

        [HttpPut("/users/{id}")]
        public async Task<IActionResult> UpdateUserById(Guid id, [FromBody] CreateUserRequest request)
        {
            try
            {
                var model = await client
                    .From<User>()
                    .Where(user => user.Id == id)
                    .Single();

                if (model == null)
                {
                    return NotFound($"User with ID {id} not found.");
                }

                model.Name = request.Name;
                model.Email = request.Email;
                model.OwnedBoards = request.OwnedBoards;
                model.SharedBoards = request.SharedBoards;

                await model.Update<User>();
                return Ok($"Successfully created new user with ID: {id}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred while updating the user with ID {id}: {ex.Message}");
                return StatusCode(500, $"An error occurred while updating the user with ID {id}.");
            }
        }

        [HttpDelete("/boards/{id}")]
        public async Task<IActionResult> DeleteUserById(Guid id)
        {
            try
            {
                await client
                    .From<User>()
                    .Where(user => user.Id == id)
                    .Delete();

                return Ok($"Successfully deleted new user with ID: {id}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred while deleting the user with ID {id}: {ex.Message}");
                return StatusCode(500, $"An error occurred while deleting the user with ID {id}.");
            }
        }
    }

}
