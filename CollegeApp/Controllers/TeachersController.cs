using CollegeApp.Data;
using Microsoft.AspNetCore.Mvc;

namespace CollegeApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeachersController : BaseEntityController<Teacher>
    {

        public TeachersController(ApplicationDbContext context) : base(context)
        {
        }
    }
}
