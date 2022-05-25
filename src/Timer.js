export default function Timer(props) {
  const { timer, hasWon, started } = props;
  const timeString = `${Math.floor(timer / 60)}:${timer % 60 < 10 ? "0" : ""}${
    timer % 60
  }`;

  let timerClass
  if (hasWon) {
    timerClass = "won"
  } else if (!started) {
    timerClass = "inactive"
  }

  return (
    <div className="timer-wrapper">
      <div className={`timer ${timerClass}`}>{timeString}</div>
    </div>
  );
}
