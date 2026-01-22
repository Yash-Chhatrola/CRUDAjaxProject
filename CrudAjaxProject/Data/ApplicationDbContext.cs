using CrudAjaxProject.Models;
using Microsoft.EntityFrameworkCore;

namespace CrudAjaxProject.Services
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext>options): base(options)
        {
            
        }
        public DbSet<Employee> employees { get; set; }
    }
}
