using Microsoft.AspNetCore.Mvc;
using CalorieTracker.DTO;
using System.Net.Http;

namespace CalorieTracker.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ObjectPracticeController : ControllerBase
    {
        /// <summary>
        /// This is a practice controller for testing Medium advanced object-oriented programming and json parising concepts.
        /// It is not intended for production use.
        /// </summary>
        /// <returns>A simple message demonstrating OOP principles.</returns>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PracticeDTO>>> GetObjectPractice()
        {
            return Ok("Practice");
        }
    }
}