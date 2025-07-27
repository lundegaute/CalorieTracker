using System.IdentityModel.Tokens.Jwt;
using System.Text;
using CalorieTracker.Configuration;
using CalorieTracker.Models;
using Microsoft.IdentityModel.Tokens;

namespace CalorieTracker.HelperMethods
{
    public static class Validation
    {
        public static void ValidateToken(string token, JwtSettings jwtSettings)
        {
            if (string.IsNullOrEmpty(token))
            {
                throw new ArgumentException("Token not found");
            }
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(jwtSettings.SecretKey);
            Console.WriteLine("------ Validating token -----");
            var validationParams = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = jwtSettings.Issuer,
                ValidAudience = jwtSettings.Audience,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ClockSkew = TimeSpan.Zero // Optional: remove the default 5-minute grace period
            };
            tokenHandler.ValidateToken(token, validationParams, out var validatedToken);
        }
        public static void DoesUserAlreadyExist(Boolean userExists)
        {
            if (userExists)
            {
                throw new ArgumentException("User already exists with this email.");
            }
        }
        public static void CheckIfNull<T>(T entity)
        {
            if (entity is null)
            {
                throw new KeyNotFoundException($"{typeof(T).Name} not found in database");
            }
        }
        public static void CheckIfIdInRange(int id)
        {
            ArgumentOutOfRangeException.ThrowIfNegativeOrZero(id);
        }
        public static void ThrowErrorIfNegative(double number)
        {
            ArgumentOutOfRangeException.ThrowIfNegative(number);
        }
        public static void IfInDatabaseThrowException(bool isDuplicate, string className)
        {
            if (isDuplicate)
            {
                throw new ArgumentException($"{className} already in database");
            }
        }
        
    }
}