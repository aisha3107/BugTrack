using BugTrack.Models;
using BugTrack.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BugTrack.BLL
{
    public class ProjectBll
    {
        ProjectsRepository repo;

        public ProjectBll()
        {
            repo = new ProjectsRepository();
        }

        public List<ProjectViewModel> GetProjectsList()
        {
            var projects = repo.GetList()
                .Select(x => new ProjectViewModel()
                {
                    Id = x.Id,
                    Name = x.Name,
                    ChildNodes = x.Projects1                        
                        .Select(childX => new ProjectViewModel()
                        {
                            Id = childX.Id,
                            Name = childX.Name
                        })
                        .ToList(),
                })
                .ToList();
            
            return projects;
        }        
    }
}