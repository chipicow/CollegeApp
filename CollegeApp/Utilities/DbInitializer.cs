using CollegeApp.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace CollegeApp.Utilities
{
    public static class DbInitializer
    {
        public static void Migrate<T>(IApplicationBuilder app) where T : DbContext
        {
            using (var scope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                //This will create the database if non existing and seed it else apply any missing migration
                if (scope.ServiceProvider.GetRequiredService<T>().Database.EnsureCreated())
                {
                    SeedDatabase(app);
                }
                else
                {
                    scope.ServiceProvider.GetRequiredService<T>().Database.Migrate();
                }
            }
        }

        public static void SeedDatabase(IApplicationBuilder app)
        {
            using (var scope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
                var course = new Course()
                {
                    Name = "Computer Science"
                };
                context.Courses.Add(course);

                var teacher = new Teacher()
                {
                    Name = "Albert",
                    Salary = 875,
                    Birthday = DateTime.UtcNow.AddYears(-40)
                };
                var teacher2 = new Teacher()
                {
                    Name = "Sebastian",
                    Salary = 1875,
                    Birthday = DateTime.UtcNow.AddYears(-55)
                };
                context.Teachers.Add(teacher);
                context.Teachers.Add(teacher2);

                var student = new Student()
                {
                    Name = "Albertina",
                    Birthday = DateTime.UtcNow.AddYears(-18),
                    RegistrationNumber = "50032866"
                };
                var student2 = new Student()
                {
                    Name = "Sebastianita",
                    Birthday = DateTime.UtcNow.AddYears(-20),
                    RegistrationNumber = "50032867"
                };
                context.Students.Add(student);
                context.Students.Add(student2);

                var subject = new Subject()
                {
                    Name = "Object Oriented Programming",
                    Course = course,
                    Teacher = teacher
                };
                var subject2 = new Subject()
                {
                    Name = "Algorithms",
                    Course = course,
                    Teacher = teacher2
                };
                var subject3 = new Subject()
                {
                    Name = "Math",
                    Course = course,
                    Teacher = teacher
                };
                context.Subjects.Add(subject);
                context.Subjects.Add(subject2);
                context.Subjects.Add(subject3);

                var studentSubject = new StudentSubjects()
                {
                    Student = student,
                    Subject = subject,
                    Grade = 50
                };
                var studentSubject2 = new StudentSubjects()
                {
                    Student = student2,
                    Subject = subject,
                    Grade = 75
                };
                var studentSubject3 = new StudentSubjects()
                {
                    Student = student,
                    Subject = subject2,
                    Grade = 50
                };
                var studentSubject4 = new StudentSubjects()
                {
                    Student = student2,
                    Subject = subject3,
                    Grade = 50
                };
                context.StudentSubjects.Add(studentSubject);
                context.StudentSubjects.Add(studentSubject2);
                context.StudentSubjects.Add(studentSubject3);
                context.StudentSubjects.Add(studentSubject4);

                context.SaveChanges();
            }
        }
    }
}

