using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CollegeApp.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CollegeApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoursesController : BaseEntityController<Course>
    {

        public CoursesController(ApplicationDbContext context) : base(context)
        {
        }

        /// <summary>
        /// Returns the list of courses with its subjects, teachers and students.
        /// </summary>
        /// <returns>The list of courses.</returns>
        public override async Task<ActionResult<IEnumerable<Course>>> GetAsync()
        {
            return await _context.Courses.AsNoTracking()
                .Include(p => p.Subjects).ThenInclude(p => p.Teacher)
                .Include(p => p.Subjects).ThenInclude(p => p.StudentSubjects).ThenInclude(p => p.Student)
                .ToListAsync();
        }
    }
}
