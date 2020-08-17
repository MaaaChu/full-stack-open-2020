import React from 'react'
import Country from './Country'

const Countries = ({ countryFilter, countries }) => {

    const findCountry = 
        countries.filter(country => country.name.toLowerCase().includes(countryFilter.toLowerCase()))

    if(countryFilter.length === 0) return <p>Please enter a country above</p>
    if(findCountry.length > 10) return <p>Too many matches, please specify another filter</p> 
    if(findCountry.length === 1) {
        return (
            <Country
                key={findCountry[0].alpha2Code} 
                country={findCountry[0]}
                isSingleCountry={true}
            />
        ) 
    }

    return (
        <div>
            {
                findCountry.map(country => {
                    return (
                        <Country 
                            key={country.alpha2Code} 
                            country={country}
                            isSingleCountry={false}
                        />
                    )
                })
            }
        </div>
    )
}

export default Countries