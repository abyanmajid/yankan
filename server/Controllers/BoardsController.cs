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
        private readonly Supabase.Client _supabase;

        public BoardController(Supabase.Client supabase)
        {
            _supabase = supabase;
        }

        [HttpPost("/boards")]
        public async Task<IActionResult> CreateBoard([FromBody] CreateBoardRequest request)
        {
            var board = new Board
            {
                Name = request.Name,
                Members = request.Members,
                Tasks = request.Tasks,
            };

            var response = await _supabase.From<Board>().Insert(board);
            var newBoard = response.Models.FirstOrDefault(); // Use FirstOrDefault() to avoid potential exceptions

            if (newBoard != null)
            {
                return Ok(newBoard.Id);
            }
            else
            {
                return StatusCode(500, "Failed to create the board."); // Handle failure case
            }
        }
    }
}
