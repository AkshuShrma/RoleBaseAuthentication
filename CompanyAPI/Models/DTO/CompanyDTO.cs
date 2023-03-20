using CompanyAPI.Data;
using System.ComponentModel.DataAnnotations;

namespace CompanyAPI.Models.DTO
{
    public class CompanyDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }    
        public string UserName { get; set; }
        public string Address { get; set; }
        public string Country { get; set; }
        public string Gst { get; set; }
        public string ApplicationUserId { get; set; }
    }
}
