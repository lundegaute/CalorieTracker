using Swashbuckle.AspNetCore.Filters;
using Microsoft.OpenApi.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using CalorieTracker.Data;
using CalorieTracker.Services;
using System.Reflection;
using System.Text.Json.Serialization;
using CalorieTracker.Configuration;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.EntityFrameworkCore;
using CalorieTracker.SwaggerExamples;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// Connecting to MySQL database
var connectionString = builder.Configuration.GetConnectionString("CalorieTrackerConnection")
    ?? throw new InvalidOperationException("Connection string 'CalorieTrackerConnection' not found.");
builder.Services.AddDbContext<DataContext>(options => options.UseMySQL(connectionString));

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    });

// Adding swagger functionality for documentation
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Version = "V1",
        Title = "Calorie Tracker",
        Description = "API handling data from Matvaretabellen to create a calorie tracking functionality"
    });
    options.ExampleFilters(); // This line is required to enable examples in Swagger

    // Add JWT functionality to Swagger Doc
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Please insert a valid Jwt token",
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        BearerFormat = "JWT",
        Scheme = "Bearer"
    });
    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme {
                Reference = new OpenApiReference {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });

    // Adding XML comments to Swagger
    var xmlFileName = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFileName);
    options.IncludeXmlComments(xmlPath);
});

// Register MongoDB settings
// Azure password Mongodbazure99
builder.Services.Configure<MongoDbSettingsClass>(builder.Configuration.GetSection("MongoDbSettings"));

// Register MongoDB client
// Add Singleton because we want to reuse the same instance across the application
builder.Services.AddSingleton<IMongoClient>(sp =>
{
    var settings = sp.GetRequiredService<IOptions<MongoDbSettingsClass>>().Value;
    return new MongoClient(settings.ConnectionString);
});


// JWT functionality 
builder.Services.Configure<JwtSettings>(
    builder.Configuration.GetSection("JwtAppSettings")
);
var jwtSettingsSection = builder.Configuration.GetSection("JwtAppSettings");
var jwtSettings = jwtSettingsSection.Get<JwtSettings>() ?? throw new InvalidOperationException("JWT settings are not configured properly in appsettings.json");

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtSettings.Issuer,
        ValidAudience = jwtSettings.Audience,
        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8
            .GetBytes(jwtSettings.SecretKey))
    };
});
builder.Services.AddAuthorization();


// Register swagger examples
builder.Services.AddSwaggerExamplesFromAssemblyOf<RegisterUserExample>();

// Dependency Injections
builder.Services.AddScoped<FoodService>();
builder.Services.AddScoped<AuthService>();
builder.Services.AddScoped<MealNameService>();
builder.Services.AddScoped<FoodSqlService>();
builder.Services.AddScoped<MealService>();
builder.Services.AddScoped<MealPlanService>();

// Adding CORS policy to allow requests from the frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        builder =>
        {
            builder.WithOrigins(
                "http://localhost:3000"
                )
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials();
        });
});

var app = builder.Build();

app.UseCors("AllowFrontend");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        options.RoutePrefix = "doc";
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "CalorieTracker V1");
    });
}

if (!app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
