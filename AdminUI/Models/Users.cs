using System;
using System.Collections.Generic;

namespace AdminUI.Models
{
    public partial class Users
    {
        public int UserId { get; set; }
        public string Title { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public int? Phone { get; set; }
        public string Address { get; set; }
        public bool IsAdmin { get; set; }
        public Nullable<DateTime> CreationDate { get; set; }
    }
}
