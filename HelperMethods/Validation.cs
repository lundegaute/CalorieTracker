using CalorieTracker.Models;

namespace CalorieTracker.HelperMethods
{
    public static class Validation
    {
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
        public static void IfInDatabaseThrowException(bool isDuplicate, string className)
        {
            if (isDuplicate)
            {
                throw new ArgumentException($"{className} already in database");
            }
        }
        
    }
}