import React from 'react'

const CountryInfo = ({ country }) => {
    return (
        <div>
            <h1>{ country.name }</h1>
            <p>capital: { country.capital }</p>
            <p>population: { country.population }</p>

            <h2>languages</h2>
            {
                country.languages.map(language => {
                    return <li key={language.name}>{ language.name }</li>
                })
            }

            <img src={ country.flag } alt="Country flag" width="100px"></img>
        </div>
    )
}

export default CountryInfo
