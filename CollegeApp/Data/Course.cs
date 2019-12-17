using System.Collections.Generic;

namespace CollegeApp.Data
{
    public class Course : BaseEntity
    {
        public string Name { get; set; }
        #region Relationships
        public ICollection<Subject> Subjects { get; set; } = new HashSet<Subject>();
        #endregion
    }
}
