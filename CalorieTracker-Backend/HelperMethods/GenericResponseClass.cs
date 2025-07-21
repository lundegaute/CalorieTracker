

namespace CalorieTracker.HelperMethods
{
    public class GenericResponse
    {

        public Dictionary<string, List<string>> message { get; set; }
        public string type { get; set; } // What type of exception
        public string title { get; set; }
        public int status { get; set; }
    }
}