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
        private bugTrackEntities1 db = new bugTrackEntities1();
        public List<int> ids = new List<int>();
        public void DeleteTask(int id)
        {
            var projectItem = db.ProjectTasks.Where(x => x.Id == id).FirstOrDefault();
            ids.Add(projectItem.Id);
            if (projectItem != null)
            {
                var childTasks = projectItem.ProjectTasks1.ToList();
                
                //var userBoardTask = db.UserBoardTasks.Where(x => x.TaskId == id).FirstOrDefault();
                //if (userBoardTask != null)
                //{
                //    db.UserBoardTasks.Remove(userBoardTask);
                //    db.SaveChanges();
                //}                    
                foreach (var childItem in childTasks)
                {
                    //ids.Add(childItem.Id);
                    DeleteTask(childItem.Id);
                    //db.ProjectTasks.Remove(childItem);
                    
                    //db.SaveChanges();
                }
                //ids.Add(projectItem.Id);
                //db.ProjectTasks.Remove(projectItem);
                db.SaveChanges();
            }

            for (int i = 0; i < ids.Count; i++)
            {
                int parenttaskid = ids[i];
                var projectItemDelete = db.ProjectTasks.Where(y => y.Id == parenttaskid).FirstOrDefault();
                if (projectItemDelete != null)
                {
                    db.ProjectTasks.Remove(projectItemDelete);
                    db.SaveChanges();
                }                
            }

            //if (childTasks == null)
            //{
            //    var currentTask = db.ProjectTasks.Where(z => z.Id == id).FirstOrDefault();
            //    if (currentTask != null)
            //    {
            //        db.ProjectTasks.Remove(currentTask);
            //    }
            //}

            //ids.ForEach(x =>
            //{
            //    var projectItemDelete = db.ProjectTasks.Where(y => y.Id == id).FirstOrDefault();
            //    db.ProjectTasks.Remove(projectItemDelete);
            //});

            //var currentTask = db.ProjectTasks.Where(z => z.Id == id).FirstOrDefault();
            //Console.Write(currentTask);
            //if (currentTask != null)
            //{
            //    db.ProjectTasks.Remove(currentTask);
            //}

            //int parenttaskid = ids[0];
            //var currentTask2 = db.ProjectTasks.Where(z => z.Id == parenttaskid).FirstOrDefault();
            //db.ProjectTasks.Remove(currentTask2);
        }
        
    }
}