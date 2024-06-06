using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class RegisterDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$", ErrorMessage="Password must contain upper and lower case letters, as well as digits.")]
        public string Password { get; set; }
        [Required]

        public string DisplayName { get; set; }
        [Required]

        public string Username { get; set; }
    }
}