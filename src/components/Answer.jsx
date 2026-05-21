export default function Answer(props) {
    return (
        <div className="answer-slot">{props.isShown ? props.value : ""}
        </div>
    )
}