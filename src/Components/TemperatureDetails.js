import React from "react";
import ParameterWeather from "./ParameterWeather";

class TemperatureDetails extends React.Component {
  render() {
    return (
      <div className="TemperatureDetails">
        <div className="leftSide">
          <span className="degreesTempDetails">{this.props.degrees}</span>
          <span
            className="symbol"
            //xss- vulnerablity problem; escaping method
            dangerouslySetInnerHTML={{ __html: this.props.degreesType }}
          />
          <br />
          <div className="typeOfWeatherLeftSide">
            <i className={"iconType wi wi-owm-" + this.props.iconId} />

            <span className="weatherTypeTempDet">
              {this.props.typeOfWeather}
            </span>
          </div>
        </div>
        <div className="verticalLine" />
        <div className="rightSide">
          <ParameterWeather
            title="Wind"
            value={this.props.wind}
            unit="&nbsp;km/h"
          />

          <ParameterWeather
            title="Humidity"
            value={this.props.humidity}
            unit="%"
          />
          <span className="tooltiptext" />

          <ParameterWeather
            title="Pollution"
            value={this.props.pollution}
            unit="&nbsp;AQI"
          />
        </div>
      </div>
    );
  }
}

export default TemperatureDetails;
