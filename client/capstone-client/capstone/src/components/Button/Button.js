import "./button.scss";

function Button({ image, text, onClick, type }) {
  return (
    <button type={type} className="button" onClick={onClick}>
      <img src={image} alt="Upload button" className="button-image" />
      {text}
    </button>
  );
}

export default Button;
