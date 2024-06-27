using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using taskassign.model;

namespace taskassign.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;

        public TaskController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }

        // GET: api/<EmployeeController>
        [HttpGet]
        public JsonResult Get()
        {
            try
            {
                DataTable dt = new DataTable();
                string sqlDataSource = _configuration.GetConnectionString("EmpCon");
                SqlDataReader myReader;
                using (SqlConnection myCon = new SqlConnection(sqlDataSource))
                {
                    myCon.Open();
                    using (SqlCommand myCommand = new SqlCommand("get_Task", myCon))
                    {
                        myCommand.CommandType = CommandType.StoredProcedure; // Set the command type to stored procedure
                        myReader = myCommand.ExecuteReader();
                        dt.Load(myReader);
                        myReader.Close();
                    }
                }
                return new JsonResult(dt);
            }
            catch (Exception ex)
            {
                return new JsonResult(ex);
            }
        }

        [Route("GetById")]
        [HttpGet]
        public IActionResult GetById(int taskid)
        {
            var connectionString = _configuration.GetConnectionString("EmpCon");
            using var connection = new SqlConnection(connectionString);
            using var command = new SqlCommand("gettaskid", connection)
            {
                CommandType = CommandType.StoredProcedure
            };
            command.Parameters.Add(new SqlParameter("@TaskId", taskid));

            try
            {
                connection.Open();
                var reader = command.ExecuteReader();
                if (reader.HasRows) {
                    var task = new taskclass();
                    while (reader.Read())
                    {

                        task.taskid = Convert.ToInt32(reader["taskid"]);
                        task.title = reader["title"].ToString();
                        task.description = reader["description"].ToString();
                        task.due_date = Convert.ToDateTime(reader["due_date"]);
                    };
                    return Ok(task);
                }
                else 
                { 
                    return NotFound("Task not found");
                }
            }
            catch (Exception ex)
            {
                // Return a generic error message to the client
                return StatusCode(500, new { Message = "An error occurred while retrieving the task.", Error = ex.Message });
            }
        }



        [HttpPost]
        public string Post(taskclass stud)
        {
            SqlConnection con = new SqlConnection(_configuration.GetConnectionString("EmpCon").ToString());
            con.Open();
            SqlCommand cmd = new SqlCommand("InsertTask", con);
            cmd.CommandType = CommandType.StoredProcedure;

            // Add parameters to the command
            cmd.Parameters.AddWithValue("@title", stud.title);
            cmd.Parameters.AddWithValue("@description", stud.description);
            cmd.Parameters.AddWithValue("@due_date", stud.due_date);
            int i = cmd.ExecuteNonQuery();
            if (i > 0)
            {
                return "Data Inserted";
            }
            else
            {
                return "ERROR";
            }
        }


        [HttpDelete]
        public IActionResult Delete(int taskid)
        {
            var connectionString = _configuration.GetConnectionString("EmpCon");
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand("DeleteTask", connection);
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@taskid", taskid);

                try
                {
                    connection.Open();
                    int result = command.ExecuteNonQuery();
                    if (result > 0)
                    {
                        return Ok();
                    }
                    else
                    {
                        return NotFound();
                    }
                }
                catch (Exception ex)
                {
                    // Handle the exception
                    return StatusCode(500, ex.Message);
                }
            }
        }

        [HttpPut]
        public IActionResult Put(taskclass stud)
        {
            var connectionString = _configuration.GetConnectionString("EmpCon");
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                string sqlQuery = @"
            UPDATE taskdl
            SET
                title = @title,
                description = @description,
                due_date = @due_date
            WHERE taskid = @taskid";

                using (SqlCommand command = new SqlCommand(sqlQuery, connection))
                {
                    // Add parameters to the command
                    command.Parameters.AddWithValue("@title", stud.title);
                    command.Parameters.AddWithValue("@description", stud.description);
                    command.Parameters.AddWithValue("@due_date", stud.due_date);
                    command.Parameters.AddWithValue("@taskid", stud.taskid);

                    try
                    {
                        connection.Open();
                        int result = command.ExecuteNonQuery();
                        if (result > 0)
                        {
                            return Ok("Task updated successfully.");
                        }
                        else
                        {
                            return NotFound($"Task with id {stud.taskid} not found.");
                        }
                    }
                    catch (Exception ex)
                    {
                     
                        return StatusCode(500, "An internal server error occurred. Please try again later.");
                    }
                }
            }
        }

    }
}
