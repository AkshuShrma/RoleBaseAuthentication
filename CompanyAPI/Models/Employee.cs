using CompanyAPI.Data;

namespace CompanyAPI.Models
{
    public class Employee
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Address { get; set; }
        public int AccountNumber { get; set; }
        public int PANCard { get; set; }
        public int PFAccountNumber { get; set; }
        public int CompanyId { get; set; }
        public int? DesignationId { get; set; }
    }
}
