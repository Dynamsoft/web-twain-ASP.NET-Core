using Microsoft.AspNetCore.Mvc;
using System.IO;

namespace aspnetcoreapp.Controllers
{
    public class UploadController : Controller
    {
        [HttpPost]
        public void Index()
        {
            var files = Request.Form.Files;
            var uploads = Path.Combine(Directory.GetCurrentDirectory(), "uploads");
            if (!Directory.Exists(uploads))
            {
                Directory.CreateDirectory(uploads);
            }

            foreach (var file in files)
            {
                var filename = file.FileName;
                using (var fileStream = new FileStream(Path.Combine(uploads, filename), FileMode.Create))
                {
                    file.CopyTo(fileStream);
                    fileStream.Flush();
                }
            }
        }
    }
}
