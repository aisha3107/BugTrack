using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using BugTrack.DAL;

namespace BugTrack.BLL
{
    public class ProjectTasksBLL
    {
        private bugTrackEntities db = new bugTrackEntities();

        public void DeleteTask(int id)
        {
            var projectItem = db.ProjectTasks.Where(x => x.Id == id).FirstOrDefault();

            if (projectItem != null)
            {
                var childTasks = projectItem?.ProjectTasks1.ToList();
                    //projectItem?.ProjectTasks1.ToList();

                foreach (var childItem in childTasks)
                {
                    DeleteTask(childItem.Id);
                    db.ProjectTasks.Remove(childItem);
                    db.SaveChanges();
                }

                db.ProjectTasks.Remove(projectItem);
                db.SaveChanges();
            }
        }
    }
}