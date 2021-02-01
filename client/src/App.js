import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

const api = axios.create({
  baseURL : "http://localhost:5000/"
});

function App() {

  const [name,setName] = useState('');
  const [list,setList] = useState([]);

  const fetchData = async ()=>{
    try{
        const response = await api.get("/");
        console.log(response.data.data.list);
        setList(response.data.data.list);
    }catch(err){}
};
  const handleSubmit = async (e)=>{
    e.preventDefault();
    try{
      console.log(name);
      const response =  await api.post("/create", {
        name
      }
      );
      console.log(response);
      setName("");
      fetchData();
    }catch(err){}
  };

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <p>
         Task Manager - PERN demo
        </p>
        <form action="">
         <div>
          <input
              type="text"
              className="form-control"
              placeholder="Name"
              value = { name }
              onChange = {(e)=>setName(e.target.value)}
          />
          <button
            type="submit"
            className="btn btn-primary"
            onClick = {handleSubmit}
          >
            Add
          </button>
          </div> 
        </form>
        <span className="head">
          Content Read from POSTGRES via Express API
        </span>
        {list &&
           
            list.map((l) => {
              return(
              <div key={ list.id }>

                   <h3>{ l.name }&nbsp;{ l.completed == true ? 'Done' : 'Not Done' }</h3>
                   
              </div>
              )
            })
            
        }
      </header>
    </div>
  );
}

export default App;
