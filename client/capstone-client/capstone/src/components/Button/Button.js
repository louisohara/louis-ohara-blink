import "./button.scss";

function Button({ image, text }) {
  return (
    <button type="click" className="button">
      <img src={image} alt="Upload button" className="button-image" />
      {text}
    </button>
  );
}

export default Button;
