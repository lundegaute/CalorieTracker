using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Identity;
using CalorieTracker.Models;
using CalorieTracker.DTO;
using CalorieTracker.Configuration;
using CalorieTracker.HelperMethods;
using CalorieTracker.Data;
using Microsoft.EntityFrameworkCore;

namespace CalorieTracker.Services
{
    public class AuthService
    {
        private readonly JwtSettings _jwtSettings;
        private readonly DataContext _context;


        public AuthService(DataContext context, IOptions<JwtSettings> jwtSettings)
        {
            _jwtSettings = jwtSettings.Value;
            _context = context;
        }

        public async Task RegisterUserAsync(RegisterUserDTO user)
        {
            // Check if user already exists
            var userExists = await _context.Users.AnyAsync(u => u.Email == user.Email);
            Validation.DoesUserAlreadyExist(userExists);

            // Hash the password and create a new user
            var passwordHasher = new PasswordHasher<User>();
            var hashedPassword = passwordHasher.HashPassword(null, user.Password);
            var newUser = new User
            {
                Email = user.Email,
                PasswordHash = hashedPassword,
                Role = "User"
            };
            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();
        }

        public async Task<string> ValidateUser(LoginUserDTO user)
        {
            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == user.Email);
            Validation.CheckIfNull(existingUser);

            var passwordHasher = new PasswordHasher<User>(); // ! Null forgiving operator. I know existingUser is not null, if i get past the Validation
            var result = passwordHasher.VerifyHashedPassword(existingUser!, existingUser!.PasswordHash, user.Password);
            if (result == PasswordVerificationResult.Success)
            {
                return GenerateToken(existingUser);
            }
            throw new UnauthorizedAccessException("Invalid credentials");
        }
        public string GenerateToken(User user)
        {
            var claims = new[] {
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()), // Unique identifier for the token
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()), // Adds the userID to the token claims
                new Claim(ClaimTypes.Email, user.Email), // Subject of the token, typically the user's email
                new Claim(ClaimTypes.Role, user.Role), // User's role, can be used for authorization
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.SecretKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _jwtSettings.Issuer,
                audience: _jwtSettings.Audience,
                claims: claims,
                expires: DateTime.Now.AddMinutes(_jwtSettings.ExpireMinutes),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}