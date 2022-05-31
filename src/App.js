import { useCallback, useEffect, useState } from "react";
import { BiCalendar, BiCheck } from "react-icons/bi";

const App = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("petName");
  const [orderBy, setOrderBy] = useState("");

  const fetchData = useCallback(() => {
    fetch("./data.json")
      .then((res) => res.json())
      .then((elem) => {
        setData(elem);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSearch = data
    ?.filter((item) => {
      return (
        item.petName.toLowerCase().includes(search.toLowerCase()) ||
        item.ownerName.toLowerCase().includes(search.toLowerCase()) ||
        item.aptNotes.toLowerCase().includes(search.toLowerCase())
      );
    })
    .sort((a, b) => {
      const order = orderBy === "asc" ? 1 : -1;
      return a[sortBy].toLowerCase() < b[sortBy].toLowerCase()
        ? -1 * order
        : 1 * order;
    });

  const deleteApp = (id) => {
    setData(data.filter((elem) => elem.id !== id));
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <div>
        <h1>
          <BiCalendar /> Appointments
        </h1>
        <hr />
        <input type="text" value={search} onChange={(e) => handleChange(e)} />
        <hr />
      </div>
      <div>
        <ul>
          <li onClick={()=>setSortBy('petName')}>petname {(sortBy === 'petName') && <BiCheck />}</li>
          <li onClick={()=>setSortBy('ownerName')}>ownerName {(sortBy === 'ownerName') && <BiCheck />}</li>
          <li onClick={()=>setSortBy('aptDate')}>aptDate {(sortBy === 'aptDate') && <BiCheck />}</li>
          <li onClick={()=>setOrderBy('asc')}>asc {(orderBy === 'asc') && <BiCheck />}</li>
          <li onClick={()=>setOrderBy('desc')}>desc {(orderBy === 'desc') && <BiCheck />}</li>
        </ul>
      </div>
      <div>
        {handleSearch.length > 0 ? (
          handleSearch.map((elem, index) => {
            return (
              <div key={elem.id}>
                <h1>
                  {index + 1}-{elem.petName}
                </h1>
                <h3>{elem.ownerName}</h3>
                <h4>{elem.aptNotes}</h4>
                <h5>{elem.aptDate}</h5>
                <p onClick={() => deleteApp(elem.id)}>X</p>
              </div>
            );
          })
        ) : (
          <p>no match</p>
        )}
      </div>
    </div>
  );
};

export default App;
