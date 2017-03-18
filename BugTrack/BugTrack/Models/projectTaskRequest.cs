using BugTrack.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BugTrack.Models
{
    public class ProjectTaskRequest
    {
        public ProjectTasks projectTasks { get; set; }

        public int projectBoardId { get; set; }
    }
}