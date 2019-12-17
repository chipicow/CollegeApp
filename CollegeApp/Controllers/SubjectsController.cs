using CollegeApp.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CollegeApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubjectsController : BaseEntityController<Subject>
    {

        public SubjectsController(ApplicationDbContext context) : base(context)
        {
        }

        /// <summary>
        /// Returns the list of subjects with its teacher info and students grades.
        /// </summary>
        /// <returns>The list of courses.</returns>
        public override async Task<ActionResult<IEnumerable<Subject>>> GetAsync()
        {
            return await _context.Subjects.AsNoTracking()
                .Include(p => p.Teacher)
                .Include(p => p.StudentSubjects).ThenInclude(p => p.Student)
                .ToListAsync();
        }

    }
}
