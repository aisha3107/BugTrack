using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using BugTrack.DAL;

namespace BugTrack.Models
{
    public class ProjectTaskViewModel
    {
        public bool? IsWordNeed { get; set; }

        public ProjectTasks ProjectTasks { get; set; }
    }
}