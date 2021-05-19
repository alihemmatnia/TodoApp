using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Todo.Server.Data;

namespace Todo.Server.Services
{
    public interface ITodoService
    {
        Task<bool> AddNewTodo(TodoDto todo);
        Task<List<TodoDto>> GetAllTodo();
        Task<bool> DeleteTodo(int Id);
    }

    public class TodoService : ITodoService
    {
        private readonly DataBaseContext _context;

        public TodoService(DataBaseContext context)
        {
            _context = context;
        }

        public Task<bool> AddNewTodo(TodoDto todo)
        {
            throw new NotImplementedException();
        }

        public Task<bool> DeleteTodo(int Id)
        {
            throw new NotImplementedException();
        }

        public Task<List<TodoDto>> GetAllTodo()
        {
            throw new NotImplementedException();
        }
    }

    public record TodoDto
    {
        public string Title { get; set; }
    }

    public record ResponseMessage
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public string Error { get; set; } = null;
        public List<TodoDto> Todos { get; set; } = null;
    }
}
