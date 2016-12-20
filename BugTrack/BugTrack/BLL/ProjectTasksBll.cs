using BugTrack.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BugTrack.BLL
{
    public class ProjectTasksBll
    {
        BugTrackEntities db;

        public ProjectTasksBll()
        {
            db = new BugTrackEntities();
        }
        
        public List<ProjectTasks> GetTasks(string userId)
        {
            return db.ProjectTasks
                .Where(x=>x.AssignedUserId == userId)
                .ToList();
        }

        public void AddTask(ProjectTasks obj)
        {
            db.ProjectTasks.Add(obj);
            db.SaveChanges();
        }

        public void UpdateTask(int projectTaskId, ProjectTasks updateObj)
        {
            var oldRecord = db.ProjectTasks.Where(x => x.Id == projectTaskId).FirstOrDefault();
            // сохранить в историю
            var historicRecord = new ProjectTaskHistory() {
                ParentTaskId = oldRecord.ParentTaskId,
                ProjectId = oldRecord.ProjectId,
                StatusId = oldRecord.StatusId,
                //и тд
            };
            db.ProjectTaskHistory.Add(historicRecord);

            // обновить старые данные
            oldRecord.StatusId = updateObj.StatusId;            
            // и тд

            // сохранить изменения
            db.SaveChanges();
        }
    }
}