using CrudAjaxProject.Models;
using CrudAjaxProject.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data.Common;
using System.Net;

namespace CrudAjaxProject.Controllers
{
    public class AjaxController : Controller
    {
        private readonly ApplicationDbContext context;

        public AjaxController(ApplicationDbContext context)
        {
            this.context = context;
        }
        public IActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public IActionResult Employeelist()
        {
            try
            {
                var data = context.employees.ToList();
                var res1 = new APIResponse
                {
                    Status = "Success",
                    StatusCode = HttpStatusCode.OK,
                    Message = "Data show on Your page",
                    Data = data
                };
                return Ok(res1);
            }
            catch (Exception ex)
            {
                var mes = "Unknown Error" + ex.Message;
                return StatusCode((int)HttpStatusCode.Forbidden, mes);
            }
            
        }
        [HttpPost]
        public IActionResult AddEmployee(Employee employee)
        {
            try
            {
                var checkName = context.employees.FirstOrDefault(emp => emp.Name == employee.Name);
                if (checkName != null)
                {
                    var res1 = new APIResponse
                    {
                        Status = "Success",
                        StatusCode = HttpStatusCode.Found,
                        Message = "This Name is Already Registered With Us"

                    };
                    return Ok(res1);
                }

                var emp = new Employee();
                {
                    emp.Name = employee.Name;
                    emp.City = employee.City;
                    emp.State = employee.State;
                    emp.Salary = employee.Salary;
                }
                context.employees.Add(emp);
                context.SaveChanges();

                var res = new APIResponse
                {
                    Status = "Success",
                    StatusCode = HttpStatusCode.Created,
                    Message = "Data is Saved"
                };
                return Ok(res);
            }
            catch (Exception ex)
            {
                var res = new APIResponse
                {
                    Status = "Failed",
                    StatusCode = HttpStatusCode.Forbidden,
                    Message = "Data is not Saved" + ex.Message
                };
                return StatusCode((int)HttpStatusCode.Forbidden, res);
            }
        }
        [HttpGet]
        public IActionResult Delete(int id)
        {
            try
            {
                var data = context.employees.Where(e => e.Id == id).SingleOrDefault();
                if (data == null)
                {
                    var res1 = new APIResponse
                    {
                        Status = "NotFound",
                        StatusCode = HttpStatusCode.NoContent,
                        Message = "Id is not available"
                    };
                    return Ok(res1);

                }
                context.employees.Remove(data);
                context.SaveChanges();

                var res = new APIResponse
                {
                    Status = "Success",
                    StatusCode = HttpStatusCode.OK,
                    Message = "Data is Deleted"
                };
                return Ok(res);
            }
            catch (Exception ex)
            {
                var mes = "Unknown Error ,You can't Delete data" + ex.Message;
                return StatusCode((int)HttpStatusCode.Forbidden, mes);
            }
        }
        [HttpGet]
        public IActionResult Edit(int id)
        {
            try
            {
                var data = context.employees.Where(e => e.Id == id).SingleOrDefault();
                if (data == null)
                {
                    return NotFound($"Employee with id {id} not found.");
                }
                return Ok(data);
            }
            catch(Exception ex)
            {
                var mes = "Unknown Error ,You can't Edit data" + ex.Message;
                return StatusCode((int)HttpStatusCode.Forbidden,mes);
            }
        }
        [HttpPost]
        public IActionResult Update(Employee employee)
        {
            try
            {
                var data = context.employees.AsNoTracking().SingleOrDefault(e => e.Id == employee.Id);
                if (data != null)
                {
                    
                    var checkName = context.employees.Any(emp => emp.Name == employee.Name && emp.Id != employee.Id);
                    if (checkName)
                    {
                        var res1 = new APIResponse
                        {
                            Status = "Success",
                            StatusCode = HttpStatusCode.Found,
                            Message = "This Name is Already Registered With Us"

                        };
                        return Ok(res1);
                    }
                    context.employees.Update(employee);
                    context.SaveChanges();

                    var res = new APIResponse
                    {
                        Status = "Success",
                        StatusCode = HttpStatusCode.Created,
                        Message = $"Record id {data.Id} is Updated"
                    };
                    return Ok(res);
                }

                var res2 = new APIResponse
                {
                    Status = "Success",
                    StatusCode = HttpStatusCode.OK,
                    Message = "Record is not Upadated because of id is null"
                };
                return Ok(res2);

            }
            catch (Exception ex)
            {
                var res = new APIResponse
                {
                    Status = "Failed",
                    StatusCode = HttpStatusCode.Forbidden,
                    Message = "Data is not Updated!!!!" + ex.Message
                };
                return StatusCode((int)HttpStatusCode.Forbidden, res);
            }
           
        }
    }
}
