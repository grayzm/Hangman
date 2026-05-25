export default function Hostages(props) {
  const styles = {
    backgroundColor: props.isKilled
      ? `color-mix(in srgb, ${props.color}, transparent 30%)`
      : props.color,
    color: props.color,
  };
  return (
    <div style={styles} className={props.isKilled ? "killed" : "hostages"}>
      {props.isKilled ? "💀" : ""}
    </div>
  );
}
