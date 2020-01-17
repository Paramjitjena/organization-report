using System;
using System.Collections.Generic;

namespace AdminUI.Models
{
    public partial class TestScores
    {
        public int TestScoreId { get; set; }
        public int? UserId { get; set; }
        public int? TestId { get; set; }
        public string NoShow { get; set; }
        public DateTime? DateSubmitted { get; set; }
        public int? TotalPoints { get; set; }
        public int? TotalCorrectPoints { get; set; }
        public string Active { get; set; }
    }
}
