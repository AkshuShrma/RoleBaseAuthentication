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
        [Display(Name = "Company Name")]
        public string? Name { get; set; }
        [Display(Name = "Company Address")]
        public string? Address { get; set; }
        public string? Country { get; set; }
        public int Gst { get; set; }
        public ICollection<Employee>? Employees { get; set; }
        public ICollection<Designation>? Designations { get; set; }
    }
}