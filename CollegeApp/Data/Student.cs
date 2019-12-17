using System;
using System.Collections.Generic;

namespace CollegeApp.Data
{
    public class Student : BaseEntity
    {
        public string Name { get; set; }
        public DateTime Birthday { get; set; }
        //RegistrationNumber will be stored as a string to support non numerical prefixes 
        public string RegistrationNumber { get; set; }

        #region Relationships
        public ICollection<StudentSubjects> StudentSubjects { get; set; } = new HashSet<StudentSubjects>();
        #endregion
    }
}
