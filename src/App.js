import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import Location from "./Components/Location";
import TemperatureDetails from "./Components/TemperatureDetails";
import Forecast from "./Components/Forecast";
import backgroundImage from "./img/weather.jpg";
import searchImg from "./img/search.svg";
import SVG from "react-inlinesvg";
import moment from "moment";
import AlgoliaPlaces from "algolia-places-react";

const API_KEY = "d39775e63bedbdcf56edd5ac4e6f3b18";
const API_KEY_POLUTTION = "vnrQAQH9C7xQwr8yb";
const API_KEY_SUGGESTIONS_ID = "plLALE39MUCT";
const API_KEY_SUGGESTIONS_CODE = "6c87ecde8efadc5b1a37784201009716";
const API_ENDPOINT = "https://api.openweathermap.org/data/2.5/weather";
const API_FORECAST = "https://api.openweathermap.org/data/2.5/forecast";
const API_POLUTTION = "https://cors.io/?http://api.airvisual.com/v2/";

class App extends Component {
 

  constructor(props) {
    super(props);
    this.state = {
      searchInputCity: "",
      searchInputCountry: "",
      city: "",
      country: "",
      degrees: "",
      degreesType: "C",
      iconId: "",
      typeOfWeather: "",
      wind: "",
      humidity: "",
      pollution: "",
      forecast: [],
      loaded: false
    };
  }


  onSuggestions = ({ query, rawAnswer, suggestion, suggestionIndex }) => {
    let suggestionsCity = suggestion.name;
    suggestionsCity = suggestionsCity
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    const suggestionsCountry = suggestion.country
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    this.setState({
      searchInputCity: suggestionsCity,
      searchInputCountry: suggestionsCountry
    });
    this.getWeatherData();
  };
  getWeatherData = () => {
    const cityQuery = `${API_ENDPOINT}?q=${this.state.searchInputCity},${
      this.state.searchInputCountry
    }&units=metric&appid=${API_KEY}`;
    const forecastQuery = `${API_FORECAST}?q=${this.state.searchInputCity},${
      this.state.searchInputCountry
    }&units=metric&appid=${API_KEY}`;

    axios
      .get(cityQuery)
      .then(response => {
        const cityResponse = response.data;

        const degreesTemp = Math.round(cityResponse.main.temp);
        this.setState({
          city: cityResponse.name,
          country: cityResponse.sys.country,
          typeOfWeather: cityResponse.weather[0].main,
          degrees: degreesTemp,
          wind: cityResponse.wind.speed,
          humidity: cityResponse.main.humidity,
          iconId: cityResponse.weather[0].id
        });

        this.forecastInfo(forecastQuery);
        this.pollutionInfo();
      })
      .catch(error => {});
  };

  pollutionInfo = () => {
    const pollutionQuery = `${API_POLUTTION}city?city=${
      this.state.searchInputCity
    }&state=${this.state.searchInputCity}&country=${
      this.state.searchInputCountry
    }&key=${API_KEY_POLUTTION}`;
    axios.get(pollutionQuery).then(response => {
      const pollutionResponse = response.data;
      this.setState({
        pollution: pollutionResponse.data.current.pollution.aqius
      });
    });
  };

  forecastInfo = forecastQuery => {
    axios.get(forecastQuery).then(response => {
      const forecastResponse = response.data;
      this.setState({});
      let days = {};
      for (var i = 0; i < forecastResponse.list.length; i++) {
        var d = forecastResponse.list[i]["dt_txt"].split(" ")[0];
        if (!days[d]) days[d] = [];
        days[d].push(forecastResponse.list[i]);
      }

      let forecastArray = [];

      for (let i in days) {
        let minTempForecast = { min: "" };
        let maxTempForecast = { max: "" };

        for (let data of days[i]) {
          const time = data.dt_txt;
          const weekDayName = moment(time).format("dddd");
          const minTemp = data.main.temp_min;
          const maxTemp = data.main.temp_max;
          const iconId = data.weather[0].id;
          const forecastType = data.weather[0].main;

          if (minTempForecast.min === "" || minTemp < minTempForecast.min) {
            minTempForecast = {
              day: weekDayName,
              min: minTemp,
              forecast: forecastType,
              icon: iconId
            };
          }
          if (maxTempForecast.max === "" || maxTemp > maxTempForecast.max) {
            maxTempForecast = {
              day: weekDayName,
              max: maxTemp,
              forecast: forecastType,
              icon: iconId
            };
          }
        }

        forecastArray.push({
          day: maxTempForecast.day,
          min: Math.round(minTempForecast.min),
          max: Math.round(maxTempForecast.max),
          minForecast: minTempForecast.forecast,
          maxForecast: maxTempForecast.forecast,
          minIcon: minTempForecast.icon,
          maxIcon: maxTempForecast.icon
        });

       
      }

      this.setState({
        forecast: forecastArray,
        loaded: true
      });
    });
  };

  render() {
    const degreesType = this.state.degreesType === "C" ? "&deg;" : "&#8457";
    const backgroundStyle = {
      backgroundImage: `url("${backgroundImage}")`
    };
    return (
      <div className="App" style={backgroundStyle}>
        <div className="backgroundFilter">
          <div className="Search">
            <label htmlFor="searchBar">
              <button
                type="submit"
                className="searchButton"
                onClick={this.getWeatherData}
              >
                <SVG className="searchSVG" src={searchImg}>
                  <img src={searchImg} alt="icon" />
                </SVG>
              </button>

              <AlgoliaPlaces
                placeholder="Search your location"
                options={{
                  appId: API_KEY_SUGGESTIONS_ID,
                  apiKey: API_KEY_SUGGESTIONS_CODE,
                  language: "en",
                  type: "city"
                }}
                onChange={this.onSuggestions}
              />
            </label>
          </div>
          {this.state.loaded ? (
            <div>
              <Location city={this.state.city} country={this.state.country} />
              <TemperatureDetails
                degrees={this.state.degrees}
                degreesType={degreesType}
                iconId={this.state.iconId}
                typeOfWeather={this.state.typeOfWeather}
                wind={this.state.wind}
                humidity={this.state.humidity}
                pollution={this.state.pollution}
              />
              <Forecast
                forecast={this.state.forecast}
                degreesType={degreesType}
              />
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default App;
