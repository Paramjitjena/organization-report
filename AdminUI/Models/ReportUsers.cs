using System;
using System.Collections.Generic;

namespace AdminUI.Models
{
    public partial class ReportUsers
    {
        public int UserId { get; set; }
        public string Fname { get; set; }
        public string Lname { get; set; }
        public string Gender { get; set; }
        public int? EthnicId { get; set; }
        public string EmployeeId { get; set; }
        public string Active { get; set; }
    }
}
