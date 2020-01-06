using AjaxPractice.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AjaxPractice.Controllers
{
    public class HomeController : Controller
    {
        PracticeDB _db = new PracticeDB();
        // GET: Home
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult List()
        {
             return Json(_db.List(),JsonRequestBehavior.AllowGet);
        }

        public JsonResult Add(Practice p)
        {
            return Json(_db.Add(p), JsonRequestBehavior.AllowGet);
        }

        public JsonResult FindByID(int id)
        {
            var result = _db.List().Find(p => p.ID.Equals(id));
            return Json(result,JsonRequestBehavior.AllowGet);

        }

        public JsonResult Update(Practice p)
        {
            return Json(_db.Update(p), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Delete(int id)
        {
            return Json(_db.Delete(id), JsonRequestBehavior.AllowGet);
        }
    }
}