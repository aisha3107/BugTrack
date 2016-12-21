using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using BugTrack.DAL;
using BugTrack.Models;

namespace BugTrack.Controllers
{
    public class ProjectTasksController : ApiController
    {
        private BugTrackEntities db = new BugTrackEntities();

        // GET: api/ProjectTasks
        public IEnumerable<ProjectTasksViewModel> GetProjectTasks()
        {
            return db.ProjectTasks.ToList()
                .Select(x=>new ProjectTasksViewModel()
                {
                    Id = x.Id,
                    Title = x.Title,
                    StartedOn = x.StartedOn,
                    EndedOn = x.EndedOn,
                    Url = x.Url,
                    StatusId = x.StatusId,
                    StatusName = x.Status.Name,
                    TaskTypeId = x.TaskTypeId,
                    TaskTypeName = x.TaskTypes.Name,
                    AssignedUserId = x.AssignedUserId,
                    AssignedUserName = x.AspNetUsers.UserName,
                    EstimatedEndsOn = x.EstimatedEndsOn,
                    UserId = x.UserId,
                    AuthorUserName = x.AspNetUsers1.UserName,
                    ParentTaskId = x.ParentTaskId,
                    ProjectId = x.ProjectId,
                    ProjectName = x.Projects.Name,
                    Description = x.Description,
                    CreatedOn = x.CreatedOn
                });
        }

        // GET: api/ProjectTasks/5
        [ResponseType(typeof(ProjectTasks))]
        public IHttpActionResult GetProjectTasks(int id)
        {
            ProjectTasks projectTasks = db.ProjectTasks.Find(id);
            if (projectTasks == null)
            {
                return NotFound();
            }

            return Ok(projectTasks);
        }

        // PUT: api/ProjectTasks/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutProjectTasks(int id, ProjectTasks projectTasks)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != projectTasks.Id)
            {
                return BadRequest();
            }

            db.Entry(projectTasks).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProjectTasksExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/ProjectTasks
        [ResponseType(typeof(ProjectTasks))]
        public IHttpActionResult PostProjectTasks(ProjectTasks projectTasks)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.ProjectTasks.Add(projectTasks);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = projectTasks.Id }, projectTasks);
        }

        // DELETE: api/ProjectTasks/5
        [ResponseType(typeof(ProjectTasks))]
        public IHttpActionResult DeleteProjectTasks(int id)
        {
            ProjectTasks projectTasks = db.ProjectTasks.Find(id);
            if (projectTasks == null)
            {
                return NotFound();
            }

            db.ProjectTasks.Remove(projectTasks);
            db.SaveChanges();

            return Ok(projectTasks);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ProjectTasksExists(int id)
        {
            return db.ProjectTasks.Count(e => e.Id == id) > 0;
        }
    }
}