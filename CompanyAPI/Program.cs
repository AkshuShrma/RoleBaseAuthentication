using CompanyAPI;
using CompanyAPI.Data;
using CompanyAPI.Models;
using CompanyAPI.Models.DTO;
using CompanyAPI.Repository;
using CompanyAPI.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Primitives;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("Conn"), b => b.MigrationsAssembly("CompanyAPI"));
});
// set the configuration for identity implementation
builder.Services.AddIdentity<ApplicationUser, IdentityRole>().AddEntityFrameworkStores<ApplicationDbContext>().AddDefaultTokenProviders();

// here add owr custom services 
builder.Services.AddScoped<IAuthentication, Authentication>();
builder.Services.AddScoped<IRefreshTokenGenerator, RefreshTokenGenerator>();
builder.Services.AddScoped<ICompany, CompanyRepo>();
builder.Services.AddScoped<IEmployeeRepo, EmployeeRepo>();

//JWT Authentication
var appsettingSection = builder.Configuration.GetSection("JWTSetting");
builder.Services.Configure<JWTSetting>(appsettingSection);
var appsetting = appsettingSection.Get<JWTSetting>();
var key = Encoding.ASCII.GetBytes(appsetting.SecretKey);
builder.Services.AddAuthentication(x =>
{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(x =>
{
    x.RequireHttpsMetadata = true;
    x.SaveToken = true;
    x.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = false,
        ValidateAudience = false,
        ClockSkew = TimeSpan.Zero
    };
    x.Events = new JwtBearerEvents
    {
        OnAuthenticationFailed = context =>
        {
            if (context.Exception.GetType() == typeof(SecurityTokenExpiredException))
            {
                context.Response.Headers.Add("IS-TOKEN-EXPIRED", "true");
            }
            return Task.CompletedTask;
        }
    };
});

// set dto configuration
builder.Services.AddAutoMapper(typeof(MappingProfile));
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen();

// adding cors policy
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "My", policy =>
    {
        policy.WithOrigins("http://localhost:3000").AllowAnyHeader().AllowAnyMethod().AllowCredentials();
    });
});



var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
/*Here we will create the role by code */
IServiceScopeFactory serviceScopeFactory = app.Services.GetRequiredService<IServiceScopeFactory>();
using (IServiceScope scope = serviceScopeFactory.CreateScope())
{
    var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
    var userManager = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();
    if (!await roleManager.RoleExistsAsync(SD.Role_Admin))
    {
        var role = new IdentityRole();
        role.Name = SD.Role_Admin;
        await roleManager.CreateAsync(role);
    }
    if (!await roleManager.RoleExistsAsync(SD.Role_Employee))
    {
        var role = new IdentityRole();
        role.Name = SD.Role_Employee;
        await roleManager.CreateAsync(role);
    }
    if (!await roleManager.RoleExistsAsync(SD.Role_Company))
    {
        var role = new IdentityRole();
        role.Name = SD.Role_Company;
        await roleManager.CreateAsync(role);
    }
}
app.UseAuthentication();
app.UseAuthorization();
app.UseCors("My");
app.MapControllers();

app.Run();