using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdminUI.ViewModels
{
    public class UpdateUser
    {
        public int UserId { get; set; }
        public string Title { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public int? Phone { get; set; }
        public string Address { get; set; }
        public bool IsAdmin { get; set; }

    }

}
