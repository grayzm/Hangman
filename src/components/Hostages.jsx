export default function Hostages(props) {
  const styles = {
    backgroundColor: props.color,
    color: props.color
  };
  return (
    <div style={styles} className={props.isKilled ? "killed" : "hostages"}>
      ""
    </div>
  );
}
