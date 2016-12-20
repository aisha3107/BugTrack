using BugTrack.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BugTrack.BLL
{
    public class ProjectsBll
    {
        BugTrackEntities db;

        public ProjectsBll()
        {
            db = new BugTrackEntities();
        }

        public List<Projects> GetProjects()
        {
            return db.Projects.ToList();
        }
    }
}