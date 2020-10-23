import React, {useState, useEffect} from 'react'
import axios from 'axios'

const CountryName = ({name, singleHandler}) =>
    (
        <li>
            <span>{name}
                <button onClick={() => singleHandler(name)}>show</button></span>
        </li>
    )

const CountriesList = ({countries, singleHandler}) =>
    (
        <ul>
            {countries.map(country => <CountryName key={country.alpha2Code} singleHandler={singleHandler}
                                                   name={country.name}/>)}
        </ul>
    )

const CountryDetails = ({country}) =>
    (
        <div>
            <h2>{country.name}</h2>
            <p>capital {country.capital}</p>
            <p>population {country.population}</p>
            <h3>languages</h3>
            <ul>
                {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
            </ul>
            <img width={100} height={100} src={country.flag} alt={country.name}/>
            <Weather city={country.capital}/>
        </div>
    )

const Countries = ({countries, singleHandler}) => {
    if (countries.length > 10) {
        return (
            <p>Too many matches, specify another filter</p>
        )
    } else if (countries.length === 1) {
        return (
            <CountryDetails country={countries[0]}/>
        )
    } else {
        return (
            <CountriesList countries={countries} singleHandler={singleHandler}/>
        )
    }
}

const Weather = ({city}) => {
    const api_key = process.env.REACT_APP_API_KEY;
    const [weather, setWeather] = useState({})

    const getWeather = () =>
        axios
            .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${city}`)
            .then(result => {
                const weather = {
                    temperature: result.data.current.temperature,
                    image: result.data.current.weather_icons[0],
                    wind_speed: result.data.current.wind_speed,
                    wind_direction: result.data.current.wind_direction
                }
                setWeather(weather)
            })

    useEffect(getWeather, [api_key, city])

    return (
        <div>
            <h3>Weather in {city}</h3>
            <p><b>temperature:</b> {weather.temperature}</p>
            <img src={weather.image} alt={city} width={50} height={50}/>
            <p><b>wind:</b> {weather.wind_speed} mph direction {weather.wind_direction}</p>
        </div>
    )
}

const App = () => {
    const [countries, setCountries] = useState([])
    const [search, setSearch] = useState('')

    const searchCountries = () => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                setCountries(response.data)
            })
    }

    useEffect(searchCountries, [])

    const setSingleCountry = (country) => setSearch(country)

    const shownCountries = search ? countries.filter(country => country.name.toLowerCase().includes(search.toLowerCase())) : countries

    return (
        <div>
            <div>
                find countries <input value={search} onChange={(event) => setSearch(event.target.value)}/>
            </div>
            <Countries countries={shownCountries} singleHandler={setSingleCountry}/>
        </div>
    )
}

export default App;
