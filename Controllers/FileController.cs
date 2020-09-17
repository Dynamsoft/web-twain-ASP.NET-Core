using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace dotnet_core_dwt.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileController : ControllerBase
    {
        // POST api/<FileController>
        [HttpPost]
        public async Task<IActionResult> Upload()
        {
            var files = Request.Form.Files;
            var path = Path.Combine(Directory.GetCurrentDirectory(), "Upload");
            if (!Directory.Exists(path))
            {
                try
                {
                    Directory.CreateDirectory(path);
                }
                catch (Exception e)
                {
                    Debug.WriteLine(e.StackTrace.ToString());
                    return Unauthorized("not able to create");
                }
            }
            foreach (var uploadFile in files)
            {
                var fileName = uploadFile.FileName;
                using (var stream = System.IO.File.Create(Path.Combine(path, fileName)))
                {
                    await uploadFile.CopyToAsync(stream);
                }
            }
            return Ok();
        }
    }
}
