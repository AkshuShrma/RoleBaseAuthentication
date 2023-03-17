using CompanyAPI.Data;
using Microsoft.EntityFrameworkCore.Query.SqlExpressions;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Xml.Linq;

namespace CompanyAPI.Models
{
    public class Company
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Address { get; set; }
        public string Country { get; set; }
        public string Gst { get; set; }
        public string ApplicationUserId { get; set; }
        public ApplicationUser ApplicationUser { get; set; }
        public ICollection<Employee>? Employees { get; set; }
        public ICollection<Designation>? Designations { get; set; }
    }
}