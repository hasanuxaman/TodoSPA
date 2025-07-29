using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TodoSPA.API.Models;
using TodoSPA.API.Services;

namespace TodoSPA.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodosController : ControllerBase
    {
        private readonly TodoService _service;

        public TodosController(TodoService service)
        {
            _service = service;
        }

        [HttpGet]
        [Route("GetAll")]
        public IActionResult Get() => Ok(_service.GetAll());

        [HttpGet]
        [Route("GetById/{id:int}")]
        public IActionResult Get(int id)
        {
            var todo = _service.GetById(id);
            if (todo == null) return NotFound();
            return Ok(todo);
        }

        [HttpPost]
        [Route("PostToDo")]
        public IActionResult Post([FromBody] Todo todo)
        {
            var created = _service.Add(todo);
            return CreatedAtAction(nameof(Get), new { id = created.Id }, created);
        }

        [HttpPut]
        [Route("PutById/{id:int}")]

        public IActionResult Put(int id, [FromBody] Todo todo)
        {
            if (!_service.Update(id, todo)) return NotFound();
            return NoContent();
        }
        [HttpPut]
        [Route("ToggleCompletedById/{id:int}")]

        public IActionResult ToggleCompleted(int id, [FromBody] Todo todo)
        {
            if (!_service.ToggleCompleted(id, todo)) return NotFound();
            return NoContent();
        }

        [HttpDelete]
        [Route("DeleteById/{id:int}")]
        public IActionResult Delete(int id)
        {
            if (!_service.Delete(id)) return NotFound();
            return NoContent();
        }
        
    }
}
