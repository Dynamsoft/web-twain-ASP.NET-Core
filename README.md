# DotNet Core Document Scanning

## Introduction

**Dynamic Web TWAIN** is a document scanning SDK that help developers to build online document scanning web application catering to TWAIN standard. For more details about the product, visit https://www.dynamsoft.com/Products/WebTWAIN_Overview.aspx

This is a sample project that guides developer to integrate Dynamic Web TWAIN with .NET Core MVC.  

We recommend developers to open this demo project with Visual Studio under Windows environment. 

![demo_screenshot](https://www.imgurupload.com/uploads/20200917/7d3504e5ce43c9dca0ad7b6103defaedca1cb1f6.png)

## Requirement

```
.Net Core SDK: 3.1
Dynamic Web TWAIN: 16.1.1
```

Before running the app, you should put your Dynamic Web TWAIN resource files to `/wwwroot/lib/dwt`. If you do not install Dynamic Web TWAIN, visit http://www.dynamsoft.com/Downloads/WebTWAIN_Download.aspx to download. If you have installed it, they can be found under `Resources` folder of your Dynamic Web TWAIN installation path (usually it is `C:\Program Files (x86)\Dynamsoft\Dynamic Web TWAIN SDK <version number>`)

## Build & Run

```
dotnet restore
dotnet run
```

Then, visit `https://localhost:5001` or `http://localhost:5000` to try the demo.

## Blog
[Building Cross-platform DotNet Core Document Scanning with MVC](https://www.dynamsoft.com/codepool/asp-dotnet-core-document-scanning.html)
