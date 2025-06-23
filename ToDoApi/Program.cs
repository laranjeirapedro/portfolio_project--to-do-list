using DotNetEnv;
using MongoDB.Driver;
using ToDoApi.Services;

Env.Load();

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins(
            "http://localhost:3000",
            "http://localhost:3001",
            "http://localhost:1000",
            "http://localhost:5000",
            "https://portfolio-project-to-do-list.onrender.com",
            "https://portfolio-project-to-do-list.vercel.app"
        )
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});

builder.Services.AddControllers();

builder.Configuration.AddEnvironmentVariables();
var mongoConnectionString = Environment.GetEnvironmentVariable("MONGO_CONNECTION_STRING");
var mongoDatabaseName = Environment.GetEnvironmentVariable("MONGO_DB_NAME");

if (string.IsNullOrEmpty(mongoConnectionString) || string.IsNullOrEmpty(mongoDatabaseName))
{
    throw new InvalidOperationException("MONGO_CONNECTION_STRING and MONGO_DB_NAME are missing.");
}

builder.Services.AddSingleton<IMongoClient>(_ => new MongoClient(mongoConnectionString));
builder.Services.AddSingleton<TaskService>();

var app = builder.Build();

app.UseCors("AllowFrontend");
app.UseRouting();
app.UseAuthorization();
app.MapControllers();

var port = Environment.GetEnvironmentVariable("PORT") ?? "5000";
app.Urls.Add($"http://*:{port}");

app.Run();