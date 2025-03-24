import React from "react";

const Card = ({ id, name, imageUrl, description, purpose, keyFeatures, onClick }) => {
  return (
    <div className="card" onClick={() => onClick(id)}>
      <img
        src={imageUrl}
        alt={name}
        className="card-img" // Make sure this is styled correctly
      />
      <div className="card-content">
        <h3>{name}</h3>
        <p><strong>Purpose:</strong> {purpose}</p> {/* Display the Purpose */}
        <p><strong>Key Features:</strong> {keyFeatures}</p> {/* Display the Key Features */}
        <p>{description}</p> {/* Display the description */}
      </div>
    </div>
  );
};

export default Card;
