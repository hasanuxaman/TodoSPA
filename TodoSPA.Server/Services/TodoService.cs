using TodoSPA.API.Models;

namespace TodoSPA.API.Services
{
    public class TodoService
    {
        private readonly List<Todo> _todos = new List<Todo>();
        private int _nextId = 1;
        public IEnumerable<Todo> GetAll() => _todos;
        public Todo GetById(int id) => _todos.FirstOrDefault(t => t.Id == id);
        public Todo Add(Todo todo)
        {
            todo.Id = _nextId++;
            todo.CreatedAt = DateTime.UtcNow; 
            _todos.Add(todo);
            return todo;
        }
        public bool Update(int id, Todo todo)
        {
            var existing = GetById(id);
            if (existing == null) return false;
            existing.Title = todo.Title;
            existing.IsCompleted = todo.IsCompleted;
            existing.CreatedAt = todo.CreatedAt; 
            return true;
        }
        public bool Delete(int id)
        {
            var todo = GetById(id);
            if (todo == null) return false;
            _todos.Remove(todo);
            return true;
        }
        public bool ToggleCompleted(int id, Todo updatedTodo)
        {
            var existing = _todos.FirstOrDefault(t => t.Id == id);
            if (existing == null) return false;

            existing.Title = updatedTodo.Title;
            existing.IsCompleted = updatedTodo.IsCompleted;

            
            if (updatedTodo.IsCompleted && existing.CompletedDate == null)
            {
                existing.CompletedDate = DateTime.UtcNow;
            }
            else if (!updatedTodo.IsCompleted)
            {
                
                existing.CompletedDate = null;
            }

            return true;
        }
    }
}
