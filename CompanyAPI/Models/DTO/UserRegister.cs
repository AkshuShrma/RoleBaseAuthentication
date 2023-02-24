using System.ComponentModel.DataAnnotations;

namespace CompanyAPI.Models.DTO
{
    public class UserRegister
    {
        [Required]
        public string UserName { get; set; }
        [Required]

        public string Password { get; set; }
        [Required]
        public string Role { get; set; }
    }
}
