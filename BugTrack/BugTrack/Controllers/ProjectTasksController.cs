﻿using System;
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
        public dynamic GetProjectTasks()
        {
            return db.ProjectTasks
                .Select(x => new
                {
                    x.Id,
                    x.Title,
                    x.StartedOn,
                    x.EndedOn,
                    x.Url,
                    x.StatusId,
                    StatusName = x.Status.Name,
                    x.TaskTypeId,
                    TaskTypeName = x.TaskTypes.Name,
                    x.AssignedUserId,
                    AssignedUserName = x.AspNetUsers.UserName,
                    x.EstimatedEndsOn,
                    x.UserId,
                    AuthorUserName = x.AspNetUsers1.UserName,
                    x.ParentTaskId,
                    x.ProjectId,
                    ProjectName = x.Projects.Name,
                    x.Description,
                    x.CreatedOn
                });
        }

        // GET: api/ProjectTasks/5
        [ResponseType(typeof(ProjectTasks))]
        public IHttpActionResult GetProjectTasks(int id)
        {
            var projectTasksItem = db.ProjectTasks
                .Where(x => x.Id == id)
                .Select(x => new
                {
                    x.Id,
                    x.Title,
                    x.StartedOn,
                    x.EndedOn,
                    x.Url,
                    x.StatusId,
                    x.TaskTypeId,
                    x.AssignedUserId,
                    x.EstimatedEndsOn,
                    x.UserId,
                    x.ParentTaskId,
                    x.ProjectId,
                    x.Description,
                    x.CreatedOn,
                    StatusName = x.Status.Name,
                    TaskTypeName = x.TaskTypes.Name,
                    AssignedUserName = x.AspNetUsers.UserName,
                    AuthorUserName = x.AspNetUsers1.UserName,                    
                    ProjectName = x.Projects.Name,                    
                    CommentsList = x.Comments.Select(comm=>new {comm.Id,
                        comm.Text,
                        comm.CreateDate,
                        comm.UserId,
                        Author = comm.AspNetUsers.UserName
                    }).ToList(),
                    ProjectTaskHistoryList = x.ProjectTaskHistory.Select(hist =>new {
                        hist.Id,
                        hist.UserId,
                        AuthorName = hist.AspNetUsers.UserName,
                        hist.ChangedOn,
                        hist.EstimatedEndsOn,
                        hist.AssignedUserId,
                        hist.StartedOn,
                        hist.EndedOn,
                        hist.TaskTypeId,
                        hist.Title,
                        hist.StatusId,
                        StatusName = hist.Status.Name,
                        hist.ParentTaskId,
                        hist.ProjectId,
                        hist.Description
                    }).ToList(),
                })
                .FirstOrDefault();

            if (projectTasksItem == null)
            {
                return NotFound();
            }

            return Ok(projectTasksItem);
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

        public dynamic SearchByParams(string title = "", string description = "")
        {
            return db.ProjectTasks.Where(x => x.Title.Contains(title) ||
                x.Description.Contains(description))
                .Select(x => new
                {
                    x.Id,
                    x.Title,
                    x.StartedOn,
                    x.EndedOn,
                    x.Url,
                    x.StatusId,
                    StatusName = x.Status.Name,
                    x.TaskTypeId,
                    TaskTypeName = x.TaskTypes.Name,
                    x.AssignedUserId,
                    AssignedUserName = x.AspNetUsers.UserName,
                    x.EstimatedEndsOn,
                    x.UserId,
                    AuthorUserName = x.AspNetUsers1.UserName,
                    x.ParentTaskId,
                    x.ProjectId,
                    ProjectName = x.Projects.Name,
                    x.Description,
                    x.CreatedOn
                })
                .ToList();
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