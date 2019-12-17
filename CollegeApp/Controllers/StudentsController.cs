using CollegeApp.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CollegeApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentsController : BaseEntityController<Student>
    {

        public StudentsController(ApplicationDbContext context) : base(context)
        {
        }

        /// <summary>
        /// Returns the list of students with its subjects grades.
        /// </summary>
        /// <returns>The list of courses.</returns>
        public override async Task<ActionResult<IEnumerable<Student>>> GetAsync()
        {
            return await _context.Students.AsNoTracking()
                .Include(p => p.StudentSubjects).ThenInclude(p => p.Subject)
                .ToListAsync();
        }

        /// <summary>
        /// Assigns a student to a subject
        /// </summary>
        [HttpPost("{id}/assign/{subjectId}")]
        public virtual async Task<ActionResult> AssignToSubject([FromRoute]Guid id, Guid subjectId)
        {
            var studentAssign = new StudentSubjects()
            {
                StudentId = id,
                SubjectId = subjectId
            };
            await _context.StudentSubjects.AddAsync(studentAssign);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        /// <summary>
        /// Deassign a student from a subject
        /// </summary>
        [HttpDelete("{id}/deassign/{subjectId}")]
        public virtual async Task<ActionResult> DeassignFromSubject([FromRoute]Guid id, Guid subjectId)
        {
            var studentAssign = new StudentSubjects()
            {
                StudentId = id,
                SubjectId = subjectId
            };
            await _context.StudentSubjects.AddAsync(studentAssign);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
