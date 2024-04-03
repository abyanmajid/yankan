using Microsoft.AspNetCore.Mvc;

namespace yankan.Controllers
{
    [ApiController]
    public class HealthCheckController: ControllerBase
    {
        [HttpGet("/")]
        public IActionResult Get()
        {
            return Ok("Hello World!\n");
        }
    }
}
