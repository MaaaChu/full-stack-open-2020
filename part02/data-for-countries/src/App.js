import React, { useState, useEffect } from 'react';
import CountryFilter from './components/CountryFilter'
import Countries from './components/Countries'

import axios from 'axios'


function App() {
  const [ countries, setCountries ] = useState([])
  const [ countryFilter, setCountryFilter ] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleCountryFilterOnChange = (e) => setCountryFilter(e.target.value) 

  return (
    <div>
      find countries:
      <CountryFilter 
        countryFilter={countryFilter} 
        handleCountryFilterOnChange={handleCountryFilterOnChange} 
      />

      <Countries
        countryFilter={countryFilter}
        countries={countries}
      />
    </div>
  );
}

export default App;
