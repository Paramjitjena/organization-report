using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdminUI.ViewModels
{
    public class UserDetail
    {
        public string UserName { get; set; }
        public string Token { get; set; }
        public int UserId { get; set; }
        public bool IsAdmin { get; set; }
    }
}
