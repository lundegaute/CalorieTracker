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
    }
}