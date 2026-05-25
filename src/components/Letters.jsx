export default function Letters(props) {
  let bgColor = "#cfcfcf";

  if (props.isGuessed) {
    bgColor = props.isCorrect ? "#1dd1a1" : "#ee5253";
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
