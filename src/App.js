import { useCallback, useEffect, useState } from "react";
import { BiCalendar, BiCheck } from "react-icons/bi";

const App = () => {
  const clearData = {
    ownerName:'',
    petName:"",
    aptDate:'',
    aptTime:'',
    aptNotes:''
    }
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("petName");
  const [orderBy, setOrderBy] = useState("");
  const [formData,setFormData] = useState(clearData)
  const [showForm, setShowForm] = useState(false);

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

  const handleChange = (e)=>{
    const {name,value} = e.target
    setFormData({...formData, [name]:value})
  }

  const handleSearch = data?.filter((item) => {
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

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <div>
        <h1>
          <BiCalendar /> Appointments
        </h1>
        <button onClick={() => setShowForm(!showForm)}>Add Appointment</button>
        <hr/>
        {showForm && (
          <form>
            <label>Owner Name</label>
            <input type="text" name="ownerName" onChange={handleChange} value={formData.ownerName}/>
            <label>Pet Name</label>
            <input type="text" name="petName" onChange={handleChange} value={formData.petName}/>
            <label>Apt Date</label>
            <input type="date" name="aptDate" onChange={handleChange} value={formData.aptDate}/>
            <label>Apt Time</label>
            <input type="time" name="aptTime" onChange={handleChange} value={formData.aptTime}/>
            <label>Apt Notes</label>
            <input type="text" name="aptNotes" onChange={handleChange} value={formData.aptNotes}/>
          </form>
        )}
        <hr />
        <input type="text" value={search} onChange={(e) => handleSearchChange(e)} />
        <hr />
      </div>
      <div>
        <ul>
          <li onClick={() => setSortBy("petName")}>
            petname {sortBy === "petName" && <BiCheck />}
          </li>
          <li onClick={() => setSortBy("ownerName")}>
            ownerName {sortBy === "ownerName" && <BiCheck />}
          </li>
          <li onClick={() => setSortBy("aptDate")}>
            aptDate {sortBy === "aptDate" && <BiCheck />}
          </li>
          <li onClick={() => setOrderBy("asc")}>
            asc {orderBy === "asc" && <BiCheck />}
          </li>
          <li onClick={() => setOrderBy("desc")}>
            desc {orderBy === "desc" && <BiCheck />}
          </li>
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
