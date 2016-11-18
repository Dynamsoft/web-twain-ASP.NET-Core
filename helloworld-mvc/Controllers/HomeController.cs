using Microsoft.AspNetCore.Mvc;

namespace aspnetcoreapp.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
