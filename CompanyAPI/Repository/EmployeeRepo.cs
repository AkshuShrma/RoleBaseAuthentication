using CompanyAPI.Data;
using CompanyAPI.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Linq;

namespace CompanyAPI.Repository
{
    public class EmployeeRepo : IEmployeeRepo
    {
        private readonly ApplicationDbContext _context;

        public EmployeeRepo(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task AddEmployee(Employee employee)
        {
            await _context.Employee.AddAsync(employee);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteEmployee(int id)
        {
            var employeeInDb = await _context.Employee.FindAsync(id);
            _context.Employee.Remove(employeeInDb);
            await _context.SaveChangesAsync();
        }

        public async Task<Employee> GetEmployeeById(int id)
        {
            var emp = await (_context.Employee.Where(v => v.Id == id).FirstOrDefaultAsync());
            return emp;
        }

        public async Task<List<Employee>> GetEmployees()
        {
            return await _context.Employee.ToListAsync();
        }

        public async Task UpdateEmployee(int id, Employee employee)
        {
            _context.Employee.Update(employee);
            await _context.SaveChangesAsync();
        }
    }
}
