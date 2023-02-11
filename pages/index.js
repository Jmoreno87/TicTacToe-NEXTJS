import Head from "next/head";
import Principal from "../components/prinicpal/principal";

//COMBINACIONES DE LAS POSICIONES EN EL TABLERO PARA GANAR

export default function Home() {
  return (
    <div className="main">
      <Head>
        <title>Tic Tac Toe Game</title>
        <meta name="ticTacToe" content="Tic tac toe game NEXTJS" />
        <link rel="icon" href="/TicTacLogo.png" />
      </Head>
      <Principal />
    </div>
  );
}
