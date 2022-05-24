export default function Timer(props) {
  const { timer } = props;
  const timeString = `${Math.floor(timer / 10)}.${timer % 10}`;

  return (
    <div className="timer-wrapper">
      <div className="timer">{timeString}</div>
    </div>
  );
}
