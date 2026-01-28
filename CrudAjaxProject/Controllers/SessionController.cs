using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;

namespace CrudAjaxProject.Controllers
{
    public class SessionController : Controller
    {
        private readonly ILogger<SessionController> logger;

        public SessionController(ILogger<SessionController>logger)
        {
            this.logger = logger;
        }
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult About()
        {
            HttpContext.Session.SetString("KeyValue", "Ramayan");
            TempData["show"] = HttpContext.Session.Id;
            return View();
        }
        public IActionResult Detail()
        {
            if (HttpContext.Session.GetString("KeyValue") != null)
            {
                ViewBag.Data = HttpContext.Session.GetString("KeyValue").ToString();
            }
            return View();
        }
        public IActionResult LogOut()
        {
            if (HttpContext.Session.GetString("KeyValue") != null)
            {
                HttpContext.Session.Remove("KeyValue");
            }
            return View();
        }
    }
}
