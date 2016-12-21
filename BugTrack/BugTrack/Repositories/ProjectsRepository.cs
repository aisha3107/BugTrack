using BugTrack.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BugTrack.Repositories
{
    public class ProjectsRepository : IRepository<Projects>
    {
        BugTrackEntities db;

        public ProjectsRepository()
        {
            db = new BugTrackEntities();
        }

        public void Create(Projects item)
        {
            throw new NotImplementedException();
        }

        public void Delete(int id)
        {
            throw new NotImplementedException();
        }
        
        public Projects GetItemInfo(int id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Projects> GetList()
        {
            return db.Projects.ToList();
        }
        
        public void Update(Projects item)
        {
            throw new NotImplementedException();
        }
    }
}