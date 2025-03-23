import React from "react";

const Card = ({ id, name, onClick }) => {
  return (
    <div className="card" onClick={() => onClick(id)}>
      <h3>{name}</h3>
    </div>
  );
};

export default Card;
