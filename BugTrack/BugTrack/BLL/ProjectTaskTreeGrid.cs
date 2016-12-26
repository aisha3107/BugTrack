using BugTrack.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BugTrack.BLL
{
    public class ProjectTaskTreeGrid
    {
        BugTrackEntities db = new BugTrackEntities();

        List<dynamic> treeGrid = new List<dynamic>();

        List<int> addedTasks = new List<int>();

        public dynamic GetTasksTreeGrid()
        {
            var allTasks = db.ProjectTasks.OrderBy(x => x.ParentTaskId ?? 0).ToList();
            var parentNodeFirst = treeGrid.FirstOrDefault();
            AddRecursively(allTasks, ref parentNodeFirst);

            return treeGrid;
        }

        private void AddRecursively(ICollection<ProjectTasks> allTasks,
            ref dynamic parentNodeFirst)
        {
            foreach (var taskItem in allTasks)
            {
                var parentProjectId = taskItem.ParentTaskId ?? 0;
                var node = new object();

                if (!IsInTree(taskItem.Id))
                {
                    node = new
                    {
                        taskItem.Id,
                        taskItem.Title,
                        taskItem.StartedOn,
                        taskItem.EndedOn,
                        taskItem.Url,
                        taskItem.StatusId,
                        StatusName = taskItem.Status.Name,
                        taskItem.TaskTypeId,
                        TaskTypeName = taskItem.TaskTypes.Name,
                        taskItem.AssignedUserId,
                        AssignedUserName = taskItem.AspNetUsers == null ? null : taskItem.AspNetUsers.UserName,
                        taskItem.EstimatedEndsOn,
                        taskItem.UserId,
                        AuthorUserName = taskItem.AspNetUsers1 == null ? null : taskItem.AspNetUsers1.UserName,
                        taskItem.ParentTaskId,
                        taskItem.ProjectId,
                        ProjectName = taskItem.Projects.Name,
                        taskItem.Description,
                        taskItem.CreatedOn,
                        ChildTaskNodes = new List<dynamic>(),
                    };
                    if (parentProjectId == 0)
                        treeGrid.Add(node);
                    else
                    {
                        parentNodeFirst.ChildTaskNodes.Add(node);
                    }
                    addedTasks.Add(taskItem.Id);

                    if (taskItem.ProjectTasks1.Count > 0)
                    {
                        AddRecursively(taskItem.ProjectTasks1, ref node);
                    }
                }
            }
        }

        private bool IsInTree(int projectTaskId)
        {
            return addedTasks.Contains(projectTaskId);
        }
    }
}