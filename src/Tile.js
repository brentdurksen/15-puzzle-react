export default function Tile(props) {
  const { row, col, handleClick } = props;
  return (
    <div
      className={props.value === 0 ? "tile-empty" : "tile"}
      style={{ gridRow: row + 1, gridColumn: col + 1 }}
      onClick={handleClick}
      onTouchStart={handleClick}
    >
      <h1 className="tile-label">{props.value}</h1>
    </div>
  );
}
