import Tablero from "components/tablero/tablero";
import style from "components/prinicpal/principal.module.css";
import { useState, useRef } from "react";

export default function principal() {
  const [Begin, setBegin] = useState(false);
  const j1 = useRef();
  const j2 = useRef();

  if (!Begin) {
    return (
      <div className={style.gridContainer}>
        <div className={style.h1}>
          <h1>Menu</h1>
        </div>

        <div className={style.gridSeleccion}>
          <h2 className={style.h2}>Selecciona los nombres de los Jugadores</h2>
          <div className={style.SeleccionNombres}>
            <div className={style.divSeleccionJugador1}>
              <h3 className={style.TituloJugador}>Jugador X</h3>
              <textarea
                className={style.TextoNombre}
                ref={j1}
                rows="1"
                maxLength="15"
                placeholder="Jugador X"
                name="textJug1"
                id="textJug1"
                onKeyDown={(event) => {
                  if (event.key == "Enter" || event.code == "Space") {
                    event.preventDefault();
                  }
                }}
              ></textarea>
            </div>

            <div className={style.divSeleccionJugador2}>
              <h3 className={style.TituloJugador}>Jugador O</h3>
              <textarea
                className={style.TextoNombre}
                ref={j2}
                rows="1"
                maxLength="15"
                placeholder="Jugador 0"
                name="textJug2"
                id="textJug2"
                onKeyDown={(event) => {
                  if (event.key == "Enter" || event.code == "Space") {
                    event.preventDefault();
                  }
                }}
              ></textarea>
            </div>
          </div>
          <div className={style.button}>
            <div>
              <button
                className={style.boton}
                onClick={() => {
                  setBegin(true);
                }}
              >
                Empezar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    try {
      let j1t = j1.current.value;
      let j2t = j2.current.value;

      if (j1t === "" ? (j1t = "Jugador X") : j1t);

      if (j2t === "" ? (j2t = "Jugador O") : j2t);
      const NombresJugador = { j1: j1t, j2: j2t };

      return <Tablero nombres={NombresJugador} />;
    } catch (error) {
      setBegin(false);
    }
  }
}
