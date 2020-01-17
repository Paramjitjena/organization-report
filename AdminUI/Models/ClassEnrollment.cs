using System;
using System.Collections.Generic;

namespace AdminUI.Models
{
    public partial class ClassEnrollment
    {
        public int ClassEnrollmentId { get; set; }
        public int? UserId { get; set; }
        public int? ClassId { get; set; }
        public string Active { get; set; }
    }
}
