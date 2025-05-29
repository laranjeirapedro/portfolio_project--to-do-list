using DotNetEnv;
using MongoDB.Driver;
using ToDoApi.Services;

Env.Load();

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocal", policy =>
    {
        policy.WithOrigins("http://localhost:3000", "http://localhost:3001")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });

    options.AddPolicy("AllowProduction", policy =>
    {
        policy.WithOrigins("https://portfolioproject-to-do-list-production.up.railway.app")
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

if (app.Environment.IsDevelopment())
{
    app.UseCors("AllowLocal");
}
else
{
    app.UseCors("AllowProduction");
}
app.UseAuthorization();
app.MapControllers();

app.Run();