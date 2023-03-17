using CompanyAPI.Data;
using CompanyAPI.Models;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;

namespace CompanyAPI.Repository
{
    public class LeaveRepo:ILeaveRepo
    {
        private readonly ApplicationDbContext _context;
        public LeaveRepo(ApplicationDbContext context)
        {
            _context = context;
        }

        public bool CreateLeave(LeaveType leave)
        {
            _context.Leaves.Add(leave);
            return Save();
        }

        public bool DeleteLeave(LeaveType leave)
        {
            _context.Leaves.Remove(leave);
            return Save();
        }

        public LeaveType GetLeave(int leaveId)
        {
            return _context.Leaves.Find(leaveId);
        }

        public ICollection<LeaveType> GetLeaves()
        {
            return _context.Leaves.Include(t => t.Employee).ToList();
        }

        public ICollection<LeaveType> GetLeavesInEmployeeId(int employeeId)
        {
            return _context.Leaves.Include(t => t.Employee).Where(t => t.EmployeeId == employeeId).ToList();
        }

        public bool LeaveExists(int leaveId)
        {
            return _context.Leaves.Any(t => t.Id == leaveId);
        }

        public bool Save()
        {
            return _context.SaveChanges() == 1 ? true : false;
        }

        public bool TrailExists(int employeeId)
        {
            return _context.Leaves.Any(t => t.Id == employeeId);
        }

        public bool UpdateLeave(LeaveType leave)
        {
            _context.Leaves.Update(leave);
            return Save();
        }
    }
}
