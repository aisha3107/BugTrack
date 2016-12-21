using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BugTrack.Models
{
    public class ProjectTasksViewModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public System.DateTime StartedOn { get; set; }
        public Nullable<System.DateTime> EndedOn { get; set; }
        public string Url { get; set; }
        public int StatusId { get; set; }
        public string StatusName { get; set; }
        public int TaskTypeId { get; set; }
        public string TaskTypeName { get; set; }
        public string AssignedUserId { get; set; }
        public string AssignedUserName { get; set; }
        public Nullable<System.DateTime> EstimatedEndsOn { get; set; }
        public string UserId { get; set; }
        public string AuthorUserName { get; set; }
        public Nullable<int> ParentTaskId { get; set; }
        public Nullable<int> ProjectId { get; set; }
        public string ProjectName { get; set; }
        public string Description { get; set; }
        public Nullable<System.DateTime> CreatedOn { get; set; }

    }
}