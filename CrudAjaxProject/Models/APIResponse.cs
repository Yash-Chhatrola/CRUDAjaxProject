using System.Net;

namespace CrudAjaxProject.Models
{
    public class APIResponse
    {
        public string Status { get; set; } = string.Empty;
        public HttpStatusCode StatusCode { get; set; } 
        public string Message { get; set; } = string.Empty;
        public dynamic Data { get; set; } = string.Empty;
    }
}
