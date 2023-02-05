import { useEffect, useState } from "react";
import "./css/App.css";
import Equipo from "./classes/Equipo";
import FechasVisual from "./components/FechasVisual";
import ListaEquipos from "./components/ListaEquipos";
import CambiarNombres from "./components/CambiarNombres";
function App() {
  const [cantEquipos, setCantEquipos] = useState(0);
  const [cantEquiposInput, setCantEquiposInput] = useState(0);
  const [listaEquipos, setListaEquipos] = useState([]);
  const [fechas, setFechas] = useState([]);
  const [fechasVisual, setFechasVisual] = useState([]);
  const [nroFecha, setNroFecha] = useState(0);
  const [isModifyingName, setIsModifyingName] = useState(false);
  useEffect(() => {
    document.getElementById("jugar-fecha").disabled = true;
  }, []);
  const handleCantEquipos = (e) => {
    e.preventDefault();
    document.getElementById("confirmar-cant-equipos").disabled = true;
    setCantEquipos(cantEquiposInput);
    if (cantEquiposInput > 1)
      document.getElementById("jugar-fecha").disabled = false;
    let equipos = [];
    for (let i = 0; i <= cantEquiposInput; i++) {
      if (i == cantEquiposInput) break;
      const fuerza = (Math.random() * 30) / 100 + 0.7;
      const equipo = new Equipo(i + 1, fuerza, i);
      equipos.push(equipo);
    }
    setListaEquipos(equipos);
  };

  useEffect(() => {
    //console.log("cambia");
    setFechasVisual(
      fechas.map((fecha) => {
        return fecha.map((partido) => {
          return [
            listaEquipos.find((equipo) => equipo.id === partido[0]).nombre,
            listaEquipos.find((equipo) => equipo.id === partido[1]).nombre,
          ];
        });
      })
    );
  }, [listaEquipos]);

  const generarFechas = (equipos) => {
    const fechas = [];
    const fechasVisual = [];
    let newEquipos = equipos;
    if (newEquipos.length % 2 === 0) {
      //Cantidad de equipos pares
      for (let i = 0; i < equipos.length - 1; i++) {
        //equipos.length-1 = cantidad de fechas
        const fecha = [];
        const fechaVisual = [];
        for (let j = 0; j < equipos.length / 2; j++) {
          //equipos.length/2 = cantidad de partidos por fecha
          fecha.push([newEquipos[j].id, newEquipos[equipos.length - j - 1].id]);
          fechaVisual.push([
            newEquipos[j].nombre,
            newEquipos[equipos.length - j - 1].nombre,
          ]);
          //Definimos cada partido con un array que contiene la id de ambos contrincantes
        }
        fechas.push(fecha);
        fechasVisual.push(fechaVisual);
        //reordenamos los equipos en el array
        let primerEquipo = newEquipos[1];
        for (let i = 1; i < equipos.length - 1; i++) {
          newEquipos[i] = newEquipos[i + 1];
        }
        newEquipos[equipos.length - 1] = primerEquipo;
      }
    } else {
      //Cantidad de equipos impares
      for (let i = 0; i < equipos.length; i++) {
        //equipos.length = cantidad de fechas
        const fecha = [];
        const fechaVisual = [];
        for (let j = 0; j < equipos.length / 2; j++) {
          //equipos.length/2 = cantidad de partidos por fecha
          if (newEquipos[j].id === newEquipos[equipos.length - j - 1].id)
            continue;
          fecha.push([newEquipos[j].id, newEquipos[equipos.length - j - 1].id]);
          fechaVisual.push([
            newEquipos[j].nombre,
            newEquipos[equipos.length - j - 1].nombre,
          ]);
          //Definimos cada partido con un array que contiene la id de ambos contrincantes
        }
        fechas.push(fecha);
        fechasVisual.push(fechaVisual);
        let primerEquipo = newEquipos[0];
        for (let i = 0; i < equipos.length - 1; i++) {
          newEquipos[i] = newEquipos[i + 1];
        }
        newEquipos[equipos.length - 1] = primerEquipo;
      }
    }
    setFechasVisual(fechasVisual);
    return fechas;
  };

  useEffect(() => {
    setFechas(generarFechas(listaEquipos));
  }, [listaEquipos]);

  const handleFecha = () => {
    if (nroFecha == fechas.length - 1) {
      document.getElementById("jugar-fecha").disabled = true;
    }
    const fecha = fechas[nroFecha];
    //console.log("fecha jugada")
    jugarPartidos(fecha);
    setNroFecha(nroFecha + 1);
  };

  const jugarPartidos = (fecha) => {
    for (let partido in fecha) {
      jugarPartido(fecha[partido]);
    }
  };

  const jugarPartido = (partido) => {
    let equipo1 = listaEquipos.find((equipo) => equipo.id === partido[0]);
    let equipo2 = listaEquipos.find((equipo) => equipo.id === partido[1]);
    let calidadJuego1 = equipo1.fuerza * ((Math.random() * 50) / 100 + 0.5);
    let calidadJuego2 = equipo2.fuerza * ((Math.random() * 50) / 100 + 0.5);
    //console.log(calidadJuego1, calidadJuego2);
    let ganador = calidadJuego1 - calidadJuego2;
    if (ganador > 0.08) {
      equipo1.puntos += 3;
      equipo1.pg += 1;
      equipo2.pp += 1;
    } else if (ganador < -0.08) {
      equipo2.puntos += 3;
      equipo2.pg += 1;
      equipo1.pp += 1;
    } else {
      //console.log("empate")
      equipo1.puntos += 1;
      equipo2.puntos += 1;
      equipo1.pe += 1;
      equipo2.pe += 1;
    }
  };

  return (
    <div className="App">
      <form
        action=""
        className="app-form"
        onSubmit={(e) => handleCantEquipos(e)}
      >
        <input
          id="cant-equipos"
          type="number"
          placeholder="ingrese cantidad de equipos"
          value={cantEquiposInput}
          onChange={(e) => {
            setCantEquiposInput(e.target.value);
          }}
        />
        <button type="submit" id="confirmar-cant-equipos">
          Aceptar
        </button>
      </form>
      <div className="nombres-fechas">
        <button
          className="cambiar-nombres"
          onClick={() => {
            setIsModifyingName(!isModifyingName);
          }}
        >
          Cambiar nombres
        </button>
        <button onClick={handleFecha} id="jugar-fecha">
          Jugar fecha {nroFecha + 1}
        </button>
      </div>

      <ListaEquipos
        listaEquipos={listaEquipos}
        setListaEquipos={setListaEquipos}
      />

      <FechasVisual fechasVisual={fechasVisual} />
      {isModifyingName ? (
        <CambiarNombres
          listaEquipos={listaEquipos}
          setListaEquipos={setListaEquipos}
          setIsModifyingName={setIsModifyingName}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
