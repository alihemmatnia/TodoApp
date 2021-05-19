using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Todo.Server.Data
{
    public class ToDo
    {
        [Key]
        public int Id { get; set; }
        
        public string Title { get; set; }
    }
}
