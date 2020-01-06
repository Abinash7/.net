using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace AjaxPractice.Models
{
    public class PracticeDB
    {
        public IDbConnection _db;
        public PracticeDB()
        {
            _db = new SqlConnection("Initial Catalog=Practice; Integrated Security=true; Data Source=.;");

        }
        
        public List<Practice> List()
        {
            List<Practice> lst = _db.Query<Practice>("Select * from tblInfo").ToList();
            return lst;
        }

        public int Add(Practice p)
        {
            
            SqlParameter[] parameter =
            {
                new SqlParameter("@Username",p.Username),
                new SqlParameter("@Fullname",p.Fullname),
                new SqlParameter("@Password",p.Password),                
                new SqlParameter("@CountryID",p.CountryID),
                new SqlParameter("@Gender",p.Gender),
                new SqlParameter("@Interests",p.Interests)

            };
            string query = "Insert into tblInfo values(@Fullname,@Username,@Password,@CountryID,@Gender,@Interests)";
            var args = new DynamicParameters(new { });
            parameter.ToList().ForEach( t => args.Add(t.ParameterName, t.Value));
            var add = this._db.Execute(query, args);
            return add;
        }

        public int Update(Practice p)
        {

            SqlParameter[] parameter =
            {
                new SqlParameter("@Username",p.Username),
                new SqlParameter("@Fullname",p.Fullname),
                new SqlParameter("@Password",p.Password),
                new SqlParameter("@Gender",p.Gender),
                new SqlParameter("@CountryID",p.CountryID),
                new SqlParameter("@Interests",p.Interests),
                new SqlParameter("@ID",p.ID)
            };
            string query = ("Update tblInfo set Username=@Username,Fullname=@Fullname,Password=@Password,Gender=@Gender,CountryID=@CountryID,Interests=@Interests Where ID=@ID");
            var args = new DynamicParameters(new { });
            parameter.ToList().ForEach(t => args.Add(t.ParameterName, t.Value));
            var update = this._db.Execute(query, args);
            return update;
        }

        public int Delete(int id)
        {
            var delete =this._db.Execute("delete from tblInfo where @ID=Id", new { Id = id });
            return delete;

        }
    }
}