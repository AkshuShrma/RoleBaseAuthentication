using CompanyAPI.Models;
using System.Diagnostics;

namespace CompanyAPI.Repository
{
    public interface ILeaveRepo
    {
        ICollection<LeaveType> GetLeaves();
        ICollection<LeaveType> GetLeavesInEmployeeId(int employeeId);
        LeaveType GetLeave(int leaveId);
        bool LeaveExists(int leaveId);
        bool TrailExists(int employeeId);
        bool CreateLeave(LeaveType leave);
        bool UpdateLeave(LeaveType leave);
        bool DeleteLeave(LeaveType leave);
        bool Save();
    }
}
