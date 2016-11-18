using System.IO;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;

namespace aspnetcoreapp
{
    public class Startup
    {
        public void Configure(IApplicationBuilder app)
        {
            // app.UseDefaultFiles();
            // app.UseStaticFiles();
            app.UseFileServer();

            app.Map("/upload", UploadFile);
        }

        private static void UploadFile(IApplicationBuilder app)
        {
            app.Run(async context =>
            {
                var files = context.Request.Form.Files;
                var uploads = Path.Combine(Directory.GetCurrentDirectory(), "uploads");
                if (!Directory.Exists(uploads)) {
                    Directory.CreateDirectory(uploads);
                }

                foreach (var file in files)
                {
                    var filename = file.FileName;
                    using (var fileStream = new FileStream(Path.Combine(uploads, filename), FileMode.Create))
                    {
                        await file.CopyToAsync(fileStream);
                    }
                }
            });
        }
    }
}