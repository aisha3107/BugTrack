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

        private void AddRecursively(List<ProjectTasks> allTasks, 
            ref dynamic parentNodeFirst)
        {
            throw new NotImplementedException();
        }
    }
}