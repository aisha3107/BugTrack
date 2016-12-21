using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BugTrack.Models
{
    public class ProjectViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int ParentId { get; set; }
        public List<ProjectViewModel> ChildNodes { get; set; }

        public ProjectViewModel()
        {
            ChildNodes = new List<ProjectViewModel>();
        }
    }
}