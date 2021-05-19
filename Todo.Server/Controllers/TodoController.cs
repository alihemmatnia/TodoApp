using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Todo.Server.Services;

namespace Todo.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        private readonly ITodoService _todoService;

        public TodoController(ITodoService todoService)
        {
            _todoService = todoService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(new ResponseMessage()
            {
                Todos = await _todoService.GetAllTodo(),
                Status=true
            });
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody]TodoDto todoDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(new ResponseMessage() { Status=false, Error="مقادیر اشتباه است" });

            await _todoService.AddNewTodo(todoDto);
            return Ok(new ResponseMessage()
            {
                Message = "با موفقیت ذخیره شد",
                Status = true
            });
        }

        [HttpDelete("{Id}")]
        public async Task<IActionResult> Delete([FromRoute] int Id)
        {
            if (Id == null)
                return BadRequest(new ResponseMessage() { Error = "ایدی را وارد کنید", Status = false });

            await _todoService.DeleteTodo(Id);
            return Ok(new ResponseMessage()
            {
                Message = "با موفقیا حذف شد",
                Status = true
            });
        }

    }
}
