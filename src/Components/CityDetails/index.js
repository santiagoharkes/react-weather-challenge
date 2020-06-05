/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import MapGL from '@urbica/react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import './cityDetails.css'

function CityDetails(props) {

    const CITY_ID = props.match.params.id
    const API_KEY = "0ec15ebb478825e658213ce46dba0fc8"
    const URL = "http://api.openweathermap.org/data/2.5/"
    const MAP_TOKEN = "pk.eyJ1Ijoic3RpYWdvaCIsImEiOiJja2IxbW9iYnYwMG16MnNtd3J0eGNxYmRjIn0.Wnn8N9Ac2GqV7I7yEPMo-g"
    
    const [clima, setClima] = useState([])
    const [viewport, setViewport] = useState ({
      latitude: 45.4211,
      longitude: -75.6983,
      zoom: 10,
    })

    const fetchingCity = () => {

        fetch(`${URL}weather?id=${CITY_ID}&units=metric&APPID=${API_KEY}`)
        .then(res =>
          res.json()
        )
        .then(result => {
          if (result.cod === 200) {
            setClima(result)
            console.log("Clima result:", result)
          } else {
            alert("No se encontró la ciudad")
          }
        })        
        .catch(error => console.error(error))
    }

    useEffect(() => {
        fetchingCity()
        console.log("Clima fetch:", clima)
    }, [CITY_ID])

    return (
      (clima.cod === 200) ?
        (
        <div className="container">
          <div className='cityCardDetails'>
              <div className="cityCard-info__name">
                {clima.name}
              </div>
              <div className="cityCard-info__temperatura">
                {clima.main.temp}<span>ºc</span>
              </div>
              <div className="cityCard-info__presyhum">
                <div className="presion">
                  Presion: {clima.main.pressure}hPa
                </div>
                <div className="humedad">
                  Humedad: {clima.main.humidity}%
                </div>
              </div>
              <div className="cityCard-info__maxymin">
                <div className="minima">
                  <span className="m">Min:</span> <span className="t">{clima.main.temp_min}ºc</span>
                </div>
                <div className="maxima">
                  <span className="m">Máx:</span> <span className="t">{clima.main.temp_max}ºc</span>
                </div>
              </div>
              <div className="cityCard-info__extra">
                <div className="cityCard-info__nubyvien">
                  <div className="nubes">
                    Nubes: {clima.clouds.all}%
                  </div>
                  <div className="viento">
                    Viento: {clima.wind.speed}km/h
                  </div>
                </div>
                <div className="cityCard-info__latylong">
                  <div className="latitud">
                    Latitud: {clima.coord.lat}º
                  </div>
                  <div className="longitud">
                    Longitud: {clima.coord.lon}º
                  </div>
                </div>
              </div>
            </div>
            <div className="mapGl">
                <MapGL
                  latitude={clima.coord.lat}
                  longitude={clima.coord.lon}
                  zoom={viewport.zoom}
                  style={{ width: "100%", minHeight: "400px", borderRadius: "25px"}} 
                  accessToken={MAP_TOKEN}
                  onViewportChange={viewport => {
                  setViewport(viewport)
                  }}>
                </MapGL>
          </div>
        </div>
        )
      : ( "Cargando..." )
    )
}

export default CityDetails
