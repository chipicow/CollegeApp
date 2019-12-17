using CollegeApp.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CollegeApp.Controllers
{
    public abstract class BaseEntityController<T> : ControllerBase where T : BaseEntity
    {
        #region Constructor

        protected readonly ApplicationDbContext _context;

        public BaseEntityController(ApplicationDbContext context)
        {
            _context = context;
        }

        #endregion

        /// <summary>
        /// Returns a list of entities.
        /// </summary>
        /// <returns>The list of entities.</returns>
        [HttpGet]
        public virtual async Task<ActionResult<IEnumerable<T>>> GetAsync()
        {
            return await _context.Set<T>()
                .AsNoTracking()
                .ToListAsync();
        }

        /// <summary>
        /// Returns a single entity.
        /// </summary>
        /// <param name="id">The identifier of the requested entity.</param>
        /// <returns>The requested entity.</returns>
        [HttpGet("{id}")]
        public virtual async Task<ActionResult<T>> GetAsync(Guid id)
        {
            var entity = await _context.Set<T>().FindAsync(id);

            if (entity == null)
            {
                return NotFound();
            }

            return entity;
        }


        /// <summary>
        /// Creates a new entity.
        /// </summary>
        /// <param name="entity">A JSON object that represents the entity to be created.</param>
        /// <returns>The created entity.</returns>
        [HttpPost]
        public virtual async Task<ActionResult<T>> PostAsync(T entity)
        {
            _context.Set<T>().Add(entity);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAsync", new { id = entity.Id }, entity);
        }

        /// <summary>
        /// Updates all fields of an existing entity.
        /// </summary>
        /// <param name="id">The identifier of the entity to be updated.</param>
        /// <param name="entity">A JSON object with the updated field values.</param>
        [HttpPut("{id}")]
        public virtual async Task<IActionResult> PutAsync(Guid id, T entity)
        {
            if (id != entity.Id)
            {
                return BadRequest();
            }
            _context.Entry(entity).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        /// <summary>
        /// Deletes an existing entity.
        /// </summary>
        /// <param name="id">The identifier of the entity to be deleted.</param>
        /// <returns>The deleted entity.</returns>
        [HttpDelete("{id}")]
        public virtual async Task<ActionResult<T>> DeleteAsync(Guid id)
        {
            var entity = await _context.Set<T>().FindAsync(id);
            if (entity == null)
            {
                return NotFound();
            }

            _context.Set<T>().Remove(entity);
            await _context.SaveChangesAsync();

            return entity;
        }


    }
}
