import React from "react";
import { useEffect } from "react";
import "../css/lista-equipos.css";

const ListaEquipos = ({ listaEquipos, setListaEquipos }) => {
  /*useEffect(() => {
    console.log(listaEquipos);
  });*/
  return (
    <ul id="lista-equipos">
      <li className="datos-equipo">
        <div className="nombre-equipo">Nombre</div>
        <div className="fuerza-equipo">Fuerza</div>
        <div className="puntos-equipo">Puntos</div>
        <div className="partidos-equipo">PG</div>
        <div className="partidos-equipo">PE</div>
        <div className="partidos-equipo">PP</div>
      </li>

      {listaEquipos
        .sort((equipoA, equipoB) => {
          return equipoA.puntos > equipoB.puntos ? -1 : 1;
        })
        .map((equipo) => {
          //console.log(equipo);
          return (
            <li className="datos-equipo" key={equipo.id}>
              <div>
                <p className="nombre-equipo" id={`nombre${equipo.id}`}>
                  {equipo.nombre}
                </p>
              </div>
              <div>
                <p className="fuerza-equipo">
                  {Math.round(equipo.fuerza * 100) / 100}
                </p>
              </div>
              <div>
                <p className="puntos-equipo">{equipo.puntos}</p>
              </div>
              <div>
                <p className="partidos-equipo">{equipo.pg}</p>
              </div>
              <div>
                <p className="partidos-equipo">{equipo.pe}</p>
              </div>
              <div>
                <p className="partidos-equipo">{equipo.pp}</p>
              </div>
            </li>
          );
        })}
    </ul>
  );
};

export default ListaEquipos;
