import React from "react";
import "../css/fixture.css";

const FechasVisual = ({ fechasVisual }) => {
  return (
    <div className="fixture">
      {fechasVisual.map((fecha) => {
        return (
          <li key={`${fechasVisual.indexOf(fecha) + 1}`}>
            <div className="fecha-label">
              Fecha {fechasVisual.indexOf(fecha) + 1}{" "}
            </div>
            {fecha.map((partido) => {
              return (
                <div className="fecha-partido" key={fecha.indexOf(partido)}>
                  {partido[0]} vs {partido[1]}
                </div>
              );
            })}
          </li>
        );
      })}
    </div>
  );
};

export default FechasVisual;
