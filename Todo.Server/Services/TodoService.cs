using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Todo.Server.Data;

namespace Todo.Server.Services
{
    public interface ITodoService
    {
        void AddNewTodo(ToDo todo);
        List<ToDo> GetAllTodo();
        Task DeleteTodo(int Id);
        Task Ended(int Id);
        void Edit(ToDo todo);
        void Save();
    }

    public class TodoService : ITodoService
    {
        private readonly DataBaseContext _context;

        public TodoService(DataBaseContext context)
        {
            _context = context;
        }

        public void Edit(ToDo todo){
            _context.ToDos.Update(todo);
        }

        public void AddNewTodo(ToDo todo)
        {
            _context.ToDos.Add(todo);
        }

        public async Task DeleteTodo(int Id)
        {
            _context.ToDos.Remove(await _context.ToDos.FindAsync(Id));
        }
        public void Save()
        {
             _context.SaveChanges();
        }
        public List<ToDo> GetAllTodo()
        {
            return _context.ToDos.OrderByDescending(p=>p.Id).ToList();
        }

        public async Task Ended(int Id)
        {
            var todo=await _context.ToDos.FindAsync(Id);
            todo.IsEnded = !todo.IsEnded;
             _context.ToDos.Update(todo);
        }
    }

    public record ResponseMessage
    {
        public bool Status { get; set; }
        public string Message { get; set; } = "No Message";
        public string Error { get; set; } = null;
        public List<ToDo> Todos { get; set; } = null;
    }
}
