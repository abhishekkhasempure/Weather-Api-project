import React ,{useState}from 'react'
import '../Components/Weather.css'

function Weather() {
    let [city, setCity] = useState('');
    let [data, setData] = useState(null);
    let [error, setError] = useState(null);

    let updateCity = (event) => {
        setCity(event.target.value);
    };

    async function getWeatherApp() {
        let apiKey = "fda364b52c6e576940918b948f645af9";
        let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        try {
            let response = await fetch(apiUrl);
            let data = await response.json();
            setData(data);
            setError(null); 
        } catch (error) {
            setError('Error fetching weather data:', error);
            setData(null); 
           
        }
    }

    return (
        <div className="weather-container">
            <input type="text" placeholder="Enter city" value={city} onChange={updateCity} />
            <button className="weather-button" onClick={getWeatherApp}>Get Weather</button>
            <p className="weather-error">{error}</p>
            {data && data.main && (
                <div className="weather-data">
                    <h2 className="weather-city">Weather in : {data.name}</h2>
                    <p className="weather-temperature">Temperature: {data.main.temp}°C</p>
                    <p  className="weather-description">Description: {data.weather[0].description}</p>
                </div>
            )}
        </div>
    );
}
export default Weather