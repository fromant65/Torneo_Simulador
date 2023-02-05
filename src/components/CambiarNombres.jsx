import React, { useEffect, useState } from "react";
import "../css/cambiar-nombres.css";

const CambiarNombres = ({
  listaEquipos,
  setListaEquipos,
  setIsModifyingName,
}) => {
  /*
  useEffect(() => {
    console.log(listaEquipos);
  }, []);*/
  return (
    <div className="cambiar-nombres-container">
      <h1>Equipos:</h1>

      {listaEquipos.map((equipo) => {
        return (
          <div
            id={`change${equipo.id}`}
            teamid={equipo.id}
            key={equipo.id}
            contentEditable="true"
            //onInput={(e) => handleInput(e)}
            suppressContentEditableWarning={true}
          >
            {equipo.nombre}
          </div>
        );
      })}
      <button
        onClick={() => {
          const equipos = [];
          for (let equipo of listaEquipos) {
            equipo.setNombre(
              document.getElementById(`change${equipo.id}`).innerHTML
            );
            equipos.push(equipo);
          }
          //console.log(equipos);
          setListaEquipos(equipos);
          setIsModifyingName(false);
        }}
        className="confirmar-nombres"
      >
        Confirmar Nombres
      </button>
    </div>
  );
};

export default CambiarNombres;
