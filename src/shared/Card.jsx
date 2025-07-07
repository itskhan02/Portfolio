import React from "react";

const Card = ({ x }) => {
  const { icon, name } = x;
  return (
    <div id="card">
      <div className="card">
        <img src={icon} alt=""></img>
        <div className="card-text">
          <h2>{name}</h2>
        </div>
      </div>
    </div>
  );
};

export default Card;
