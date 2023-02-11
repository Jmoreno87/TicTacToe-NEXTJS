import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Bounce } from "react-awesome-reveal";
import style from "../tablero/tablero.module.css";
import Principal from "../prinicpal/principal";

const Victory_Comb = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export default function tablero(props) {
  //STATE TO RETURN TO MAIN SCREEN
  const [Back, setBack] = useState(false);

  //STATE TO KNOW WHEN IS THE TURN OF PLAYER X
  const [xTurn, setXTurn] = useState(true);

  // STATE TO KNOW WHEN A PLAYER WON
  const [won, setWon] = useState(false);

  //ARRAY OF POSITIONS OF THE PLAYERS
  const [winningComb, setwinningComb] = useState([]);

  //CONTENT OF THE BOARD INITIALIZE IN ""
  const [DataBoard, setDataBoard] = useState({
    0: "",
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
    7: "",
    8: "",
  });
  const [isDraw, setIsDraw] = useState(false);
  const [modalTitle, setModalTitle] = useState("");

  //  HOOK WITH DEPENDENCY  WITH THE DATABOARD
  // CHECK FOR WINNER OR DRAW
  useEffect(() => {
    checkWinner();
    checkDraw();
  }, [DataBoard]);

  // UPDATE FUNCTION TO UPDATE THE DATE IN THE BOARD CHECKING IF THE  EMPTY POSITIONS
  function updateBoardData(num) {
    if (!DataBoard[num] && !won) {
      //CHECKS IF X TURN AND IS A EMPTY POSITION UPDATE DE ARRAY OF DATA BOARD WITH DE POSITION AND PLAYER X OR O
      let value = xTurn === true ? "X" : "O";
      setDataBoard({ ...DataBoard, [num]: value });
      setXTurn(!xTurn);
    }
  }

  //FUNCTION THAR CHECKS IF DRAW HAPPENED CHECK IS A BOOLEAN RETURN TRUE IF NOT VICTOY_COMB HAPPENDED
  function checkDraw() {
    let check = Object.keys(DataBoard).every((el) => DataBoard[el]);
    setIsDraw(check);
    if (check) setModalTitle("Empate!!!");
  }

  // CHECKS IF THE VICTORY_COMB IN EVERY TURN
  // IF  A,B,C ARE ALL X OR O SETS A WINNER
  function checkWinner() {
    Victory_Comb.map((el) => {
      const [a, b, c] = el;

      if (
        DataBoard[a] &&
        DataBoard[a] === DataBoard[b] &&
        DataBoard[a] === DataBoard[c]
      ) {
        setWon(true);
        setwinningComb([a, b, c]);
        setModalTitle(
          `  ${!xTurn ? `${props.nombres.j1}` : `${props.nombres.j2}`} Gano!!!`
        );

        return;
      }
    });
  }
  //FUNCTION THAT SET "" ALL THE DATA BOARD FOR A NEW GAME
  function reset() {
    setDataBoard({
      0: "",
      1: "",
      2: "",
      3: "",
      4: "",
      5: "",
      6: "",
      7: "",
      8: "",
    });
    setXTurn(true);
    setWon(false);
    setwinningComb([]);
    setIsDraw(false);
    setModalTitle("");
  }
  if (!Back) {
    return (
      <div className={style.main}>
        <Head>
          <title>Tic Tac Toe</title>
        </Head>

        <div className={style.titulo}>
          <div className={style.volver}>
            <Image
              src="/back.png"
              alt="Volver Menu"
              width={120}
              height={120}
              onClick={() => {
                {
                  setBack(true);
                }
              }}
            />
          </div>
          <div className={style.ticTac}>
            <Bounce>
              <h1>Tic Tac Toe</h1>
            </Bounce>
          </div>
        </div>

        <div className={style.game}>
          <div className={style.game__menu}>
            <p>
              {xTurn === true
                ? "Turno de " + `${props.nombres.j1}` + " ( X )"
                : "Turno de " + `${props.nombres.j2}` + " ( 0 )"}
            </p>
          </div>
          <div className={style.game__board}>
            {[...Array(9)].map((v, idx) => {
              return (
                <div
                  onClick={() => {
                    updateBoardData(idx);
                  }}
                  key={idx}
                  className={`square ${
                    winningComb.includes(idx) ? "highlight" : ""
                  }`}
                >
                  {DataBoard[idx]}
                </div>
              );
            })}
          </div>
        </div>

        <div className={`modal ${modalTitle ? "show" : ""}`}>
          <div className="modal__title">{modalTitle}</div>
          <button className={style.boton} onClick={reset}>
            Jugar De Nuevo
          </button>
        </div>
      </div>
    );
  } else {
    return <Principal />;
  }
}
