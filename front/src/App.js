import React, { Component, useState, useEffect } from 'react';
import Header from './Header'
import './global.css'
import './App.css'
import './sidebar.css'
import './main.css'
import api from './services/api'
import DevItem from './components/DevItem'
import DevForm from './components/DevForm'
////tres conceitos para falar "eu sei react"
// Component
// estado
// propriedade

function App() {


  const [devs, setDevs] = useState([]);



  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs')
      setDevs(response.data)
      console.log(devs);
    }
    loadDevs();

  }, [])


  async function addDev(data) {
    const response = await api.post('/devs', data)


    setDevs([...devs, response.data])
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={addDev} ></DevForm>
      </aside>

      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev}></DevItem>
          ))}
        </ul>
      </main>
    </div>
  );
}



export default App;
