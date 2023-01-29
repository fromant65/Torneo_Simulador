class Equipo {
  constructor(nombre, fuerza, id) {
    this.nombre = nombre;
    this.puntos = 0;
    this.fuerza = fuerza;
    this.id = id;
    this.pp = 0; //partidos perdidos
    this.pe = 0; //partidos empatados
    this.pg = 0; //partidos ganados
  }
  setNombre = (nombre) => {
    this.nombre = nombre;
  };
}

export default Equipo;
