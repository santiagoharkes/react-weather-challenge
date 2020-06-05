import React, { useState, useEffect } from 'react';
import City from '../City'
import BarraBusqueda from '../BarraBusqueda'

import './home.css'

const API_KEY = "0ec15ebb478825e658213ce46dba0fc8"
const URL = "http://api.openweathermap.org/data/2.5/"

function App() {

    const [query, setQuery] = useState('')
    const [clima, setClima] = useState([])

    useEffect(() => {
      let data = localStorage.getItem('cities')
      if (data != null) {
        setClima(JSON.parse(data))
      }
    }, [])

    useEffect(() => {
      localStorage.setItem('cities', JSON.stringify(clima))
    }, [clima])

    const addNewCity = cityName => {
      if (!clima.find(t => t.id === cityName.id)) {
        setClima([...clima, cityName])
      } else {
        alert("Ya se encuentra la ciudad")
      }
    }

    const deleteCity = id => {
      setClima(clima.filter(city => city.id !== id))
    }

    const fetchCity = () => {
      fetch(`${URL}weather?q=${query}&units=metric&APPID=${API_KEY}`)
      .then(res =>
        res.json()
      )
      .then(result => {
        if (result.cod === 200) {
          addNewCity(result)
          setQuery('')
        } else {
          alert("No se encontró la ciudad")
        }
      })
      .catch(error => console.error(error))
    }

    const search = event => {
        if (event.key === 'Enter') {
          fetchCity()
        }
      }

  return (
    <div className="App">

      <main>
        
        <div className="busqueda">
          <BarraBusqueda setQuery={setQuery} query={query} search={search} />
          <button className="busquedaBoton" onClick={fetchCity}>Buscar</button>
        </div>

        <div className="lista">
        {(clima.length !== 0) ? (
            <ul>
              {clima.map(data => <li key={data.id}>
                  <City props={data} deleteCity={deleteCity} />
                </li>)}
            </ul>
        ) : ("No hay ninguna ciudad agregada")}
        </div>

      </main>

    </div>
  );
}

export default App;
