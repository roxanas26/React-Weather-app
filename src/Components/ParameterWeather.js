import React from "react";
const ParameterWeather = props => {
  let pollutionColor = "";
  let style = { width: props.value + "%" };
  let legend = "";
  if (props.title === "Pollution") {
    style.width = "100%";
    if (props.value <= 50) {
      pollutionColor = "green";
    } else if (props.value <= 100) {
      pollutionColor = "yellow";
    } else if (props.value <= 150) {
      pollutionColor = "orange";
    } else if (props.value <= 200) {
      pollutionColor = "red";
    } else if (props.value <= 300) {
      pollutionColor = "purple";
    } else {
      pollutionColor = "burgundy";
    }
    legend = "tooltip";
  }

  return (
    <div className={"parameter " + legend}>
      {props.title === "Pollution" ? (
        <div className="tooltiptext">
          <div className="AQILegend">
            <div className="color green">Good</div>
          </div>
          <div className="AQILegend">
            <div className="color yellow">Moderate</div>
          </div>
          <div className="AQILegend">
            <div className="color orange">Unhealthy for sensitive groups</div>
          </div>
          <div className="AQILegend">
            <div className="color red">Unhealthy</div>
          </div>
          <div className="AQILegend">
            <div className="color purple">Very Unhealthy</div>
          </div>
          <div className="AQILegend">
            <div className="color burgundy">Hazardous</div>
          </div>
        </div>
      ) : null}

      <p className="parameterTitle"> {props.title} </p>

      <div className="progressBar">
        <div className="progressText">
          <span> {props.value}</span>
          {props.unit}
        </div>

        <div className={"progress " + pollutionColor} style={style} />
      </div>
    </div>
  );
};

export default ParameterWeather;
