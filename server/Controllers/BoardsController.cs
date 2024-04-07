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
    public class BoardController : ControllerBase
    {
        private readonly Supabase.Client client;

        public BoardController(Supabase.Client supabase)
        {
            client = supabase;
        }

        [HttpGet("/boards")]
        public async Task<IActionResult> GetAllBoards()
        {
            try
            {
                var result = await client.From<Board>().Get();
                var boards = result.Models;
                return Ok(boards);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred while fetching boards: {ex.Message}");
                return StatusCode(500, "An error occurred while fetching boards.");
            }
        }

        [HttpPost("/boards")]
        public async Task<IActionResult> CreateBoard([FromBody] CreateBoardRequest request)
        {
            var board = new Board
            {
                Name = request.Name,
                Owner = request.Owner,
                Members = request.Members,
                Tasks = request.Tasks,
            };

            var response = await client.From<Board>().Insert(board);
            var newBoard = response.Models.FirstOrDefault(); // Use FirstOrDefault() to avoid potential exceptions

            if (newBoard != null)
            {
                return Ok($"Successfully created new board with ID: {newBoard.Id}");
            }
            else
            {
                return StatusCode(500, "Failed to create the board."); // Handle failure case
            }
        }

        [HttpGet("/boards/{id}")]
        public async Task<IActionResult> GetBoardById(Guid id)
        {
            try
            {
                var result = await client
                    .From<Board>()
                    .Select("*")
                    .Where(board => board.Id == id)
                    .Get(); // Assuming 'id' is the primary key and unique, Single() ensures we're getting exactly one result or an error if not found.

                // Check if a board was found
                if (result == null)
                {
                    return NotFound($"Board with ID {id} not found.");
                }

                var board = result.Model;

                return Ok(board);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred while fetching the board with ID {id}: {ex.Message}");
                return StatusCode(500, $"An error occurred while fetching the board with ID {id}.");
            }
        }

        [HttpPut("/boards/{id}")]
        public async Task<IActionResult> UpdateBoardById(Guid id, [FromBody] CreateBoardRequest request)
        {
            try
            {
                var model = await client
                    .From<Board>()
                    .Where(board => board.Id == id)
                    .Single();

                if (model == null)
                {
                    return NotFound($"Board with ID {id} not found.");
                }

                model.Name = request.Name;
                model.Owner = request.Owner;
                model.Members = request.Members;
                model.Tasks = request.Tasks;

                await model.Update<Board>();
                return Ok($"Successfully created new board with ID: {id}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred while updating the board with ID {id}: {ex.Message}");
                return StatusCode(500, $"An error occurred while updating the board with ID {id}.");
            }
        }

        [HttpDelete("/boards/{id}")]
        public async Task<IActionResult> DeleteBoardById(Guid id)
        {
            try
            {
                await client
                    .From<Board>()
                    .Where(board => board.Id == id)
                    .Delete();

                return Ok($"Successfully deleted new board with ID: {id}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred while deleting the board with ID {id}: {ex.Message}");
                return StatusCode(500, $"An error occurred while deleting the board with ID {id}.");
            }
        }
    }
}
