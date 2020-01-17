using System;
using System.Collections.Generic;

namespace AdminUI.Models
{
    public partial class Tests
    {
        public int TestId { get; set; }
        public int? ClassId { get; set; }
        public DateTime? SessionStartDate { get; set; }
        public DateTime? SessionEndDate { get; set; }
        public string Active { get; set; }
        public string Name { get; set; }
    }
}
