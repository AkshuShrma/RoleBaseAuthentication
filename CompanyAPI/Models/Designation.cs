using CompanyAPI.Data;
using System.ComponentModel.DataAnnotations;

namespace CompanyAPI.Models
{
    public class Designation
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public int CompanyId { get; set; }
        //public int ApplicationUserId { get; set; }
        //public ApplicationUser? ApplicationUser { get; set; }
        public ICollection<Employee>? Employees { get; set; }
    }
}
