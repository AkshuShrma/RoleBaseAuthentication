﻿namespace CompanyAPI.Models.DTO
{
    public class LeaveDTO
    {
        public int Id { get; set; }
        public enum LeaveStatus
        {
            Approved = 1,
            Pending = 2,
            Rejected = 3
        };
        public LeaveStatus? Status { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string? Reason { get; set; }
        public int EmployeeId { get; set; }
        public Employee? Employee { get; set; }
    }
}
