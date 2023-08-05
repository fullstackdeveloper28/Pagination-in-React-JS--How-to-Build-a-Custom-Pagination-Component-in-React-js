import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 2;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = users.slice(firstIndex, lastIndex);
  const npage = Math.ceil(users.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);
  useEffect(() => {
    GetData();
  })
  function GetData() {
    fetch('https://jsonplaceholder.typicode.com/users').then((result) => {
      result.json().then((resp) => {
        setUsers(resp);
      })
    })
  }
  function prePage() {
if(currentPage !=1)
{
  setCurrentPage(currentPage-1);
}
  }
  function nextPage() {
    if(currentPage !=npage)
    {
      setCurrentPage(currentPage+1);
    }
  }
  function changePage(id) {
    setCurrentPage(id);
  }
  return (
    <div>
      <table className='table'>
        <thead>
          <th>ID</th>
          <th>Name</th>
          <th>UsarName</th>
          <th>Email</th>
        </thead>
        <tbody>
          {
            records.map((item, i) =>
            (
              <tr key={i}>
                <td>
                  {item.id}
                </td>
                <td>
                  {item.name}
                </td>
                <td>
                  {item.username}
                </td>
                <td>
                  {item.email}
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <nav>
        <ul className='pagination'>
          <li className='page-item'>
            <a className='page-link' onClick={prePage}>prev</a>
          </li>
          {
            numbers.map((n, i) =>
            (
              <li key={i} className={`page-item ${currentPage === n ? 'active' : ''}`} >
                <a className='page-link' onClick={() => changePage(n)}>{n}</a>
              </li>
            ))
          }
          <li className='page-item'>
            <a className='page-link' onClick={nextPage}>next</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default App;
