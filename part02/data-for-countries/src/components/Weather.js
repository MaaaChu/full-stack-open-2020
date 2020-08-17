import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ country }) => {

    const api_key = process.env.REACT_APP_API_KEY
    const capitialCity = country.capital
    const apiAddress = `http://api.openweathermap.org/data/2.5/weather?q=${capitialCity}&appid=${api_key}`

    const [temperature, setTemperature] = useState('')
    const [windSpeed, setWindSpeed] = useState('')
    const [windDirection, setWindDirection] = useState('')

    useEffect(() => {
        axios
            .get(apiAddress)
            .then(response => {
                setTemperature(response.data.main.temp)
                setWindSpeed(response.data.wind.speed)
                setWindDirection(response.data.wind.deg)
            })
    }, [])

    return (
        <div>
            <h2>Weather in { capitialCity }</h2>
            <p>temperature: { temperature - 273.15 } celcius</p>

            <p>wind: { windSpeed } MPH direction { windDirection } degrees</p>
        </div>
    )
}

export default Weather
