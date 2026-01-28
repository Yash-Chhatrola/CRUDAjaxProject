using CrudAjaxProject.Services;
using Microsoft.CodeAnalysis.Options;
using Microsoft.EntityFrameworkCore;
using System;
using System.Configuration;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(10);
});

var islaptop = builder.Configuration.GetValue<bool>("islaptop");

var ismysql = builder.Configuration.GetValue<bool>("ismysql");

var constr = ismysql ? builder.Configuration.GetConnectionString("mysqlconnection") : islaptop ? builder.Configuration.GetConnectionString("laptopconnection") : builder.Configuration.GetConnectionString("DefaultConnection");

if (ismysql)
{

    builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseMySql(constr, ServerVersion.AutoDetect(constr)));
}
else
{

    builder.Services.AddDbContext<ApplicationDbContext>(Options =>
    Options.UseSqlServer(constr));
}
    

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}
app.UseSession();
app.UseHttpsRedirection();
app.UseRouting();

app.UseAuthorization();

app.MapStaticAssets();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Ajax}/{action=Index}/{id?}")
    .WithStaticAssets();


app.Run();
