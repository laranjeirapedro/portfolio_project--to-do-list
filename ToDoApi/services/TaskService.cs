using MongoDB.Driver;
using ToDoApi.Models;

namespace ToDoApi.Services;

public class TaskService
{
    private readonly IMongoCollection<TaskItem> _tasks;

    public TaskService()
    {
        var connectionString = Environment.GetEnvironmentVariable("MONGO_CONNECTION_STRING");
        var databaseName = Environment.GetEnvironmentVariable("MONGO_DB_NAME");
        var collectionName = Environment.GetEnvironmentVariable("MONGO_COLLECTION_NAME");

        if (string.IsNullOrEmpty(connectionString) || string.IsNullOrEmpty(databaseName) || string.IsNullOrEmpty(collectionName))
        {
            throw new InvalidOperationException("Environment variable are not defined.");
        }

        var client = new MongoClient(connectionString);
        var database = client.GetDatabase(databaseName);
        _tasks = database.GetCollection<TaskItem>(collectionName);
    }

    public async Task<List<TaskItem>> GetAsync() =>
        await _tasks.Find(_ => true).ToListAsync();

    public async Task<TaskItem?> GetAsync(string id) =>
        await _tasks.Find(x => x.Id == id).FirstOrDefaultAsync();

    public async Task CreateAsync(TaskItem newTask) =>
        await _tasks.InsertOneAsync(newTask);

    public async Task UpdateAsync(string id, TaskItem updatedTask) =>
        await _tasks.ReplaceOneAsync(x => x.Id == id, updatedTask);

    public async Task RemoveAsync(string id) =>
        await _tasks.DeleteOneAsync(x => x.Id == id);
}