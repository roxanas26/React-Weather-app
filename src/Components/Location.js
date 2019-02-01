import React from "react";
const Location = props => {
  const { city, country } = props;
  return (
    <div className="Location">
      <h1 className="cityName">
        <span>{city}</span>,&nbsp;
        <span>{country}</span>
      </h1>
    </div>
  );
};
export default Location;
