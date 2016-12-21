using BugTrack.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BugTrack.Repositories
{
    public class ProjectTasksRepository : IRepository<ProjectTasks>
    {
        BugTrackEntities db;

        public ProjectTasksRepository()
        {
            db = new BugTrackEntities();
        }
        
        public List<ProjectTasks> GetListByUserId(string userId)
        {
            return db.ProjectTasks
                .Where(x=>x.AssignedUserId == userId)
                .ToList();
        }
        
        public IEnumerable<ProjectTasks> GetList()
        {
            return db.ProjectTasks.ToList();
        }

        public ProjectTasks GetItemInfo(int id)
        {
            return db.ProjectTasks.Where(x => x.Id == id).FirstOrDefault();
        }

        public void Create(ProjectTasks item)
        {
            db.ProjectTasks.Add(item);
            db.SaveChanges();
        }

        public void Update(ProjectTasks item)
        {
            var oldRecord = db.ProjectTasks.Where(x => x.Id == item.Id).FirstOrDefault();
            // сохранить в историю
            var historicRecord = new ProjectTaskHistory()
            {
                ParentTaskId = oldRecord.ParentTaskId,
                ProjectId = oldRecord.ProjectId,
                StatusId = oldRecord.StatusId,
                //и тд
            };
            db.ProjectTaskHistory.Add(historicRecord);

            // обновить старые данные
            oldRecord.StatusId = item.StatusId;
            // и тд

            // сохранить изменения
            db.SaveChanges();
        }

        public void Delete(int id)
        {
            throw new NotImplementedException();
        }
    }
}