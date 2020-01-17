using System;
using System.Collections.Generic;

namespace AdminUI.Models
{
    public partial class SavedSearches
    {
        public int SearchId { get; set; }
        public int UserId { get; set; }
        public string Field { get; set; }
        public string Operator1 { get; set; }
        public string Operator2 { get; set; }
        public string Value1 { get; set; }
        public string Value2 { get; set; }
        public string Logic { get; set; }
        public string Searchname { get; set; }
        public bool IsPublic { get; set; }
    }
}
