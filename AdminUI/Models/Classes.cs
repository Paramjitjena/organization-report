using System;
using System.Collections.Generic;

namespace AdminUI.Models
{
    public partial class Classes
    {
        public int ClassId { get; set; }
        public string Name { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string Active { get; set; }
    }
}
