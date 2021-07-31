import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
const api = {
  key: 'd3b98d183854db6c8b36e5a4d2d466ca',
  base: 'https://api.openweathermap.org/data/2.5/'
}

function App() {
  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState({})

  // evt stands for event
  const search = evt => {
    // if Enter key is fired, run search
    if (evt.key === "Enter") {
      // construct api request url within fetch. The openweathermap site gives us the url to use
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        // get json from  response
        .then(res => res.json())
        // set the weather using result
        .then(result => {
          setWeather(result)
          // at this point, reset the query string so that we can start a new search easier
          setQuery('')
          console.log(weather)
        })
    }
  }

  // an arrow function which takes in the date (d)
  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    // The functions used below are inbuilt functions
    // this returns an index from 0-6. 'converts' it to string by looking up the days array
    let day = days[d.getDay()]
    // this returns a number from 1-31 (the date in the month)
    let date = d.getDate()
    // returns a month. from 0-11. 'converts' it to string by looking up the months array
    let month = months[d.getMonth()]
    // return the current year
    let year = d.getFullYear()

    // Now properly format the date string
    return `${day}, ${date} ${month} ${year}`
  }

  return (
    // "class" is a reserved keyword in JS so we use "className" instead
    // If weather is not undefined, any temperature above 16 is warm and below is cool
    // We use that criteria to set the background image
    <div className={
      (typeof weather.main != 'undefined') 
        ? ((weather.main.temp > 16) 
          ? 'App warm' 
          : 'App') 
        : 'App' 
    }>
      <main>
        <div className="search-box">
          {/* This shows search at first, then on key press, search is triggered (defined above) and the value of the input box is altered */}
          <input type="text" 
            className="search-bar" 
            placeholder="Search..." 
            onChange={e => setQuery(e.target.value)} 
            value={query} 
            onKeyPress={search}
          ></input>
        </div>
        {/* Using a ternary operator */}
        {/* If API returned result, display location box */}
        {/* Else if the API result is undefined (user has not searched), show empty string */}
        {(typeof weather.main !="undefined") ? (
          <div>
            <div className="location-box">
              {/* Specify a default (home) location */}
              {/* TO-DO: Allow user/visitor to set their own home location. */}
              {/* Display the City and country code */}
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              {/* Display the temperature */}
              <div className="temp">
                {/* we get the degree sign with alt+0176 */}
                {/* Round up the temperature value to remove the decimal part */}
                {Math.round(weather.main.temp)}°C
              </div>
              {/* Assess the weather condition */}
              <div className="weather">
                {weather.weather[0].main}
              </div>
            </div>
          </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
