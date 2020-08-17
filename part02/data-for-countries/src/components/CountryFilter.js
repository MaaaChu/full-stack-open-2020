import React from 'react'

const CountryFilter = ({ countryFilter, handleCountryFilterOnChange }) => {

    return (
        <input
            value={countryFilter}
            onChange={handleCountryFilterOnChange}
        />
    )
}

export default CountryFilter