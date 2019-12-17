using System;
using System.Collections.Generic;

namespace CollegeApp.Data
{
    public class Teacher : BaseEntity
    {
        public string Name { get; set; }
        public DateTime Birthday { get; set; }
        public decimal Salary { get; set; }

        #region Relationships
        public ICollection<Subject> Subjects { get; set; } = new HashSet<Subject>();
        #endregion
    }
}
