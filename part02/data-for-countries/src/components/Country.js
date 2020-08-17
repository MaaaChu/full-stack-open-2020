import React, { useState } from 'react'
import CountryInfo from './CountryInfo'
import Weather  from './Weather'

const Country = ({ country, isSingleCountry }) => {

    const [ showCountryInfo, setShowCountryInfo ] = useState(false)

    const toggleCountryInfo = () => setShowCountryInfo(!showCountryInfo)

    if(isSingleCountry) {
        return (
            <div>
                <CountryInfo country={country} />
                <Weather country={country} />
            </div>
        )
    } 

    if(!showCountryInfo) {
        return (
            <div>
                { country.name }
                <button onClick={() => toggleCountryInfo()}>{ !showCountryInfo ? "show" : "hide" }</button>                
            </div>
        ) 
    } 

    return (
        <div>
            <button onClick={() => toggleCountryInfo()}>{ !showCountryInfo ? "show" : "hide" }</button>
            <CountryInfo country={country} />
            <Weather />
        </div>
    )
}

export default Country
