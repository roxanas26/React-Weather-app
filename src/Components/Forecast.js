import React from "react";
import TemperatureDetails from "./TemperatureDetails";

class Forecast extends React.Component {
  render() {
    const forecastDays = this.props.forecast.map((forecastDay, i) => {
      if (i === 0) {
        forecastDay.day = "Today";
      }
      return (
        <li key={i}>
          <p className="day">{forecastDay.day}</p>
          <div className="maxForecast">
            <i className={"wi wi-owm-" + forecastDay.maxIcon} />

            <p className="degreesForecast">
              {forecastDay.max}

              <span
                dangerouslySetInnerHTML={{ __html: this.props.degreesType }}
              />
            </p>
          </div>

          <div className="minForecast">
            <i className={"wi wi-owm-" + forecastDay.minIcon} />

            <p className="degreesForecast">
              {forecastDay.min}
              <span
                dangerouslySetInnerHTML={{ __html: this.props.degreesType }}
              />
            </p>
          </div>
        </li>
      );
    });

    return (
      <div className="Forecast">
        <ul className="forecastNextDays">{forecastDays}</ul>
      </div>
    );
  }
}

export default Forecast;

