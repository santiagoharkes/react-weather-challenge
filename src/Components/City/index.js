import React from 'react'
import { Link } from 'react-router-dom'

import './city.css'

function City({props, deleteCity}) {

    console.log(props)

    return (
        <div className='cityCard'>
            <div className='close' onClick={() => deleteCity(props.id)} >X</div>
            <Link to={`/${props.id}`} className='cityCard-info'>
                    <div className="cityCard-info__name">
                        {props.name}
                    </div>
                    <div className="cityCard-info__icon">
                        <img src={`http://openweathermap.org/img/wn/${props.weather[0].icon}@2x.png`} alt=""/>
                    </div>
                    <div className="cityCard-info__temperatura">
                        {props.main.temp.toFixed(1)}<span>ºc</span>
                    </div>
                    <div className="cityCard-info__presyhum">
                        <div className="presion">
                            Presion: {props.main.pressure}hPa
                        </div>
                        <div className="humedad">
                            Humedad: {props.main.humidity}%
                        </div>
                    </div>
                    <div className="cityCard-info__maxymin">
                        <div className="minima">
                            <span className="m">Min:</span> <span className="t">{props.main.temp_min}ºc</span>
                        </div>
                        <div className="maxima">
                            <span className="m">Máx:</span> <span className="t">{props.main.temp_max}ºc</span>
                        </div>
                    </div>
            </Link>
        </div>
    )
}

export default City
