using BugTrack.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BugTrack.Repositories
{
    public interface IRepository<T> //: IDisposable 
        where T : class
    {
        IEnumerable<T> GetList();
        T GetItemInfo(int id);
        void Create(T item); // создание объекта
        void Update(T item); // обновление объекта
        void Delete(int id); // удаление объекта по id        
    }
}
