import React from "react";
import { useEffect } from "react";
import "../css/lista-equipos.css";

const ListaEquipos = ({ listaEquipos, setListaEquipos }) => {
  useEffect(() => {
    const buttons = document.getElementsByClassName("confirmar-nombre");
    for (let button of buttons) {
      button.disabled = true;
    }
  }, [listaEquipos]);

  const modificarNombre = (e) => {
    document.getElementById(`nombre${e.target.id}`).contentEditable = true;
    document
      .getElementById(`confirmar${e.target.id}`)
      .removeAttribute("disabled");
    e.target.disabled = true;
  };
  const confirmarNombre = (e) => {
    const id = e.target.id.slice(9);
    const equipo = listaEquipos.find((equipo) => equipo.id === parseInt(id));
    const index = listaEquipos.indexOf(equipo);
    equipo.nombre = document.getElementById(`nombre${id}`).innerText;
    const newArr = new Array(0);
    for (let i in listaEquipos) {
      if (i !== index) newArr.push(listaEquipos[i]);
      else newArr.push(equipo);
    }
    //const newLista = listaEquipos.filter(equipo=>equipo.id!==parseInt(id))
    //newLista.push(equipo)
    setListaEquipos(newArr);
    document.getElementById(id).removeAttribute("disabled");
    e.target.disabled = true;
  };

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
              <button id={equipo.id} onClick={(e) => modificarNombre(e)}>
                Modificar nombre
              </button>
              <button
                className="confirmar-nombre"
                id={`confirmar${equipo.id}`}
                onClick={(e) => confirmarNombre(e)}
              >
                Confirmar nombre
              </button>
            </li>
          );
        })}
    </ul>
  );
};

export default ListaEquipos;
