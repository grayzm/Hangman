export default function Letters(props) {
  let bgColor = "#e0e0e0";

  if (props.isGuessed) {
    bgColor = props.isCorrect ? "green" : "red";
  }

  const styles = {
    backgroundColor: bgColor,
    // color: props.isGuessed ? "white" : "black",
  };

  return (
    <div style={styles} className="keys" onClick={props.guess}>
      {props.value}
    </div>
  );
}
