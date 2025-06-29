

using System.ComponentModel.DataAnnotations;

namespace CalorieTracker.DTO
{
    public class RegisterUserDTO
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [MinLength(6)]
        public string Password { get; set; }
    }
    public class LoginUserDTO
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [MinLength(6)]
        public string Password { get; set; }
    }
    public class ResponseUserDTO
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
    }
}