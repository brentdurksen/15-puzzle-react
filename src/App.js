import "./App.css";
import Game from "./Game";

function App() {
  return (
    <div className="App">
      <header className="game-header">
        <h1 className="header-title">15 Puzzle</h1>
      </header>
      <div className="main-content">
        <Game />
      </div>
    </div>
  );
}

export default App;
