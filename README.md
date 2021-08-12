# DotNet Core Document Scanning
This is a sample project that guides developer to integrate [Dynamic Web TWAIN](https://www.dynamsoft.com/web-twain/overview/) into .NET Core MVC project. 

## What You Should Know
- [![](https://img.shields.io/badge/Download-Offline%20SDK-orange)](https://www.dynamsoft.com/web-twain/downloads)
- [![](https://img.shields.io/badge/Get-30--day%20FREE%20Trial%20License-blue)](https://www.dynamsoft.com/customer/license/trialLicense/?product=dwt)
 

## Requirement

- .Net Core SDK: 3.1
- Dynamic Web TWAIN v17.1

## Usage
1. Put Dynamic Web TWAIN resource files (`<Dynamic Web TWAIN installation path>/Resources>`) to `/wwwroot/lib/dwt`.

2. Update the license key in `Views/Home/Index.cshtml`:

    ```html
    Dynamsoft.DWT.ProductKey = "LICENSE-KEY";
    ```
3. Build and run the project:

    ```bash
    dotnet restore
    dotnet run
    ```

4. visit `https://localhost:5001` or `http://localhost:5000` to try the demo.

## Blog
[Building Cross-platform DotNet Core Document Scanning with MVC](https://www.dynamsoft.com/codepool/asp-dotnet-core-document-scanning.html)
