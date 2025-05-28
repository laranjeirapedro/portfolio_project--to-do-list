using MongoDB.Driver;
using ToDoApi.Models;
using Microsoft.Extensions.Options;

namespace ToDoApi.Services;

public class TaskService
{
    private readonly IMongoCollection<TaskItem> _tasks;

    public TaskService(IConfiguration configuration)
    {
        var mongoClient = new MongoClient(configuration["MongoDB:ConnectionString"]);
        var mongoDatabase = mongoClient.GetDatabase(configuration["MongoDB:DatabaseName"]);
        _tasks = mongoDatabase.GetCollection<TaskItem>(configuration["MongoDB:CollectionName"]);
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