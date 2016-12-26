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
    public class ProjectsController : ApiController
    {
        private BugTrackEntities db = new BugTrackEntities();

        // GET: api/Projects
        public dynamic GetProjects()
        {
            return db.Projects.Select(t => new
            {
                t.Id,
                t.Name,
                //Nodes = t.Projects1.Select(d => new { d.Id, d.Name })
            });
        }

        // GET: api/Projects/5
        public IHttpActionResult GetProjects(int id)
        {
            var projectItem = db.Projects
                .Where(x => x.Id == id)
                .Select(x=> new
                {
                    x.Id,
                    x.Name,
                    Nodes = x.Projects1.Select(d => new { d.Id, d.Name })
                })
                .FirstOrDefault();

            return Ok(projectItem);
        }

        // PUT: api/Projects/5
        [HttpPut, ResponseType(typeof(void))]
        public IHttpActionResult PutProjects(int id, [FromBody]Projects projects)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != projects.Id)
            {
                return BadRequest();
            }

            db.Entry(projects).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProjectsExists(id))
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

        // POST: api/Projects
        [ResponseType(typeof(Projects))]
        public IHttpActionResult PostProjects(Projects projects)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Projects.Add(projects);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = projects.Id }, projects);
        }

        // DELETE: api/Projects/5
        [ResponseType(typeof(Projects))]
        public IHttpActionResult DeleteProjects(int id)
        {
            Projects projects = db.Projects.Find(id);
            if (projects == null)
            {
                return NotFound();
            }

            db.Projects.Remove(projects);
            db.SaveChanges();

            return Ok(projects);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ProjectsExists(int id)
        {
            return db.Projects.Count(e => e.Id == id) > 0;
        }
    }
}