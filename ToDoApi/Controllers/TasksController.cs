using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using ToDoApi.Models;
using ToDoApi.Services;

namespace ToDoApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TasksController : ControllerBase
{
    private readonly TaskService _taskService;

    public TasksController(TaskService taskService) => _taskService = taskService;

    [HttpGet]
    public async Task<IActionResult> GetTasks()
    {
        var tasks = await _taskService.GetAsync();
        return Ok(new { tasks });
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<TaskItem>> Get(string id)
    {
        var task = await _taskService.GetAsync(id);
        return task is null ? NotFound() : task;
    }

    [HttpPost]
    public async Task<IActionResult> Post(TaskItem newTask)
    {

        newTask.CreatedAt = DateTime.UtcNow;
        await _taskService.CreateAsync(newTask);
        return CreatedAtAction(nameof(Get), new { id = newTask.Id }, newTask);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(string id, [FromBody] TaskItem updatedTask)
    {
        if (!ObjectId.TryParse(id, out var objectId))
        {
            return BadRequest("Invalid task ID format.");
        }

        var task = await _taskService.GetAsync(id);
        if (task == null)
        {
            return NotFound();
        }

        task.Text = updatedTask.Text;
        task.Completed = updatedTask.Completed;
        task.CompletedAt = updatedTask.Completed ? DateTime.UtcNow : null;

        task.EditedAt = DateTime.UtcNow;

        await _taskService.UpdateAsync(id, task);

        return Ok(task);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        var existingTask = await _taskService.GetAsync(id);
        if (existingTask is null) return NotFound();

        await _taskService.RemoveAsync(id);
        return NoContent();
    }

}