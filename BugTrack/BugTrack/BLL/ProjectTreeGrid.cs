using BugTrack.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BugTrack.BLL
{
    public class ProjectTreeGrid
    {
        BugTrackEntities db = new BugTrackEntities();

        List<dynamic> treeGrid = new List<dynamic>();

        List<int> addedProjects = new List<int>();

        public dynamic GetTreeGrid()
        {
            //отсортировать по ParentId (null корневые)         
            var allProjects = db.Projects.OrderBy(x => x.ParentId ?? 0).ToList();
            //в самый первый запуск нет парента поэтому какой то объект пустой передаем
            var parentNodeFirst = treeGrid.FirstOrDefault();
            AddRecursively(allProjects, ref parentNodeFirst);

            return treeGrid;
        }

        private void AddRecursively(ICollection<Projects> projects1,
            ref dynamic parentNode)
        {
            foreach (var projectItem in projects1)
            {
                var parentProjectId = projectItem.ParentId ?? 0;
                var node = new object();

                if (!IsInTree(projectItem.Id))
                {
                    node = new
                    {
                        projectItem.Id,
                        projectItem.Name,
                        projectItem.ParentId,
                        ChildNodes = new List<dynamic>(),
                    };
                    if (parentProjectId == 0)
                        treeGrid.Add(node);
                    else
                    {
                        var childNodes = parentNode.ChildNodes;
                        childNodes.Add(new
                        {
                            projectItem.Id,
                            projectItem.Name,
                            projectItem.ParentId,
                            ChildNodes = new List<dynamic>(),
                        });
                    }
                    addedProjects.Add(projectItem.Id);


                    if (projectItem.Projects1.Count > 0)
                    {
                        AddRecursively(projectItem.Projects1, ref node);
                    }
                }
            }
        }

        private bool IsInTree(int projectId)
        {
            return addedProjects.Contains(projectId);
        }
    }
}