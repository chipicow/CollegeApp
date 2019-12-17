using System;

namespace CollegeApp.Data
{
    public class StudentSubjects
    {
        public Guid StudentId { get; set; }
        public Guid SubjectId { get; set; }

        //Grades are rated from 0 to 100
        public int Grade { get; set; }

        #region Relationships
        public Student Student { get; set; }
        public Subject Subject { get; set; }
        #endregion
    }
}
