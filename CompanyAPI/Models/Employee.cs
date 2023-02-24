namespace CompanyAPI.Models
{
    public class Employee
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public int AccountNumber { get; set; }
        public int PANCard { get; set; }
        public int PFAccountNumber { get; set; }
        public LeaveType Leave { get; set; }
    }
    public enum LeaveType
    {
        Apply = 1,
        Approved = 2,
        Rejected = 3
    }
}
