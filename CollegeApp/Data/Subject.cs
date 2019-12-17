using System;
using System.Collections.Generic;

namespace CollegeApp.Data
{
    public class Subject : BaseEntity
    {
        public string Name { get; set; }
        public Guid TeacherId { get; set; }
        public Guid CourseId { get; set; }

        #region Relationships
        public Teacher Teacher { get; set; }
        public Course Course { get; set; }
        public ICollection<StudentSubjects> StudentSubjects { get; set; } = new HashSet<StudentSubjects>();
        #endregion
    }
}
