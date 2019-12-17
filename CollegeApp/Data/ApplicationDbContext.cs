using Microsoft.EntityFrameworkCore;

namespace CollegeApp.Data
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<Course> Courses { get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<StudentSubjects> StudentSubjects { get; set; }
        public DbSet<Subject> Subjects { get; set; }
        public DbSet<Teacher> Teachers { get; set; }

        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<StudentSubjects>().HasKey(x => new { x.StudentId, x.SubjectId });
            modelBuilder.Entity<StudentSubjects>()
                .HasOne(x => x.Subject)
                .WithMany(o => o.StudentSubjects)
                .HasForeignKey(x => x.SubjectId);
            modelBuilder.Entity<StudentSubjects>()
                .HasOne(x => x.Student)
                .WithMany(u => u.StudentSubjects)
                .HasForeignKey(x => x.StudentId);

            modelBuilder.Entity<Teacher>()
                .Property(p => p.Salary)
                .HasColumnType("DECIMAL(18,2)");


            modelBuilder.Entity<Subject>()
                .HasOne(p => p.Course)
                .WithMany(p => p.Subjects)
                .HasForeignKey(p => p.CourseId);
            modelBuilder.Entity<Subject>()
                .HasOne(p => p.Teacher)
                .WithMany(p => p.Subjects)
                .HasForeignKey(p => p.TeacherId);
        }
    }
}
