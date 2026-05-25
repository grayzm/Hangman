export default function Answer(props) {
  const shouldReveal = props.isShown || props.gameLost;
  const isMissed = !props.isShown && props.gameLost;

  return (
    <div className={`answer-slot ${isMissed ? "revealed-missed" : ""}`}>
      {shouldReveal ? props.value : ""}
    </div>
  );
}
