using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace taskassign.model
{
    public class taskclass
    {
        public int taskid { get; set; }
        public string title { get; set; }
        public string description { get; set; }
        public DateTime due_date { get; set; }
    }
}
