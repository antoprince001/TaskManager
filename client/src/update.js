import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import  { useHistory } from 'react-router-dom';
const api = axios.create({
  baseURL : "http://localhost:5000/"
});


function Update() {

    let history = useHistory();
  
    
  
    // useEffect(() => {
    //   fetchData();
    // }, [])
  
    return (
      <div className="App">
        <header className="App-header">
          <p>
           Task Manager - Update Page
          </p> 
        </header>
      </div>
    );
  }
  
  export default Update;