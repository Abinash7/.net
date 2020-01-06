using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AjaxPractice.Models
{
    public class Practice
    {
        public int ID { get; set; }
        public string Fullname { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public int CountryID { get; set; }
        public string Gender { get; set; }
        public string Interests { get; set; }
    }
}