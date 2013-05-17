using StackExchange.Profiling.MVCHelpers;
using System.Web;
using System.Web.Mvc;

namespace MvcKoDatalist
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
            filters.Add(new ProfilingActionFilter());
        }
    }
}