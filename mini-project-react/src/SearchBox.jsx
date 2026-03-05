import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./SearchBox.css";

export default function SearchBox({updateInfo}) {
    let [city, setCity] = useState("");
    let [error, setError] = useState(false);
    const API_URL = "https://api.openweathermap.org/data/2.5/weather";
    const API_KEY = "7d7f8c9cac6bcd0667495453af976228";

    let getWeatherInfo = async () => {
      try{
       let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
       let jsonResponse = await response.json();
       
       let result = {
        city: city,
        temp: jsonResponse.main.temp,
        tempMin: jsonResponse.main.temp_min,
        tempMax: jsonResponse.main.temp_max,
        humidity: jsonResponse.main.humidity,
        feelsLike: jsonResponse.main.feels_like,
        weather:jsonResponse.weather[0].description,
       }
       console.log(result);
       return result;
      } catch(err) {
        throw err;

      }
    };
       

  

  const handleChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = async (event) => {
    try{
      event.preventDefault();
      console.log(city);
      setCity("");
      let info = await getWeatherInfo();
      updateInfo(info);
    } catch(err) {
        setError(true);
    }
   
  };

  return (
    <div className="searchBox">


      <form onSubmit={handleSubmit}>
        <TextField
          id="city"
          label="City Name"
          variant="outlined"
          required
          value={city}
          onChange={handleChange}
        />

        <br />
        <br />

        <Button variant="contained" type="submit">
          Search
        </Button>
       {error && <p style={{color: "red"}}>No such place exists!</p>} 
      </form>
    </div>
  );
}