using CompanyAPI.Data;

namespace CompanyAPI.Models
{
    public class Employee
    {
        public int Id {  get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string AccountNumber { get; set; }
        public string PANCard { get; set; }
        public string PFAccountNumber { get; set; }
        public int CompanyId { get; set; }
        public int? DesignationId { get; set; }
       // public string ApplicationUserId { get; set; }
    }
}
