// import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import  { useHistory } from 'react-router-dom';
const api = axios.create({
  baseURL : "http://localhost:5000/"
});


function App() {

  let history = useHistory();

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

  const handleDelete = async (e,name)=>{
    e.stopPropagation();
    try {
      const response = await api.post('/delete',{
        name
      });
      console.log(response);
      fetchData();
      }catch(err){
        console.log(err);
      }
    }

  const handleUpdate = async (e,name,completed)=>{
    e.stopPropagation();
    history.push("/update");
    // try {
    //   const response = await api.put('/update',{
    //     name,
    //     completed
    //   });
    //   console.log(response);
    //   fetchData();
    //   }catch(err){
    //     console.log(err);
    //   }
}

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

                   <h3>{ l.name }&nbsp;{ l.completed === true ? 'Done' : 'Not Done' }</h3>
                   <button  onClick ={ (e) => handleUpdate(e,l.name,l.completed)}>Update</button>
              
                   <button  onClick = { (e) =>  handleDelete(e,l.name)}>Delete</button>
              </div>
              )
            })
            
        }
      </header>
    </div>
  );
}

export default App;
