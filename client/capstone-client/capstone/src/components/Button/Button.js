import "./button.scss";

function Button({ image, text, onClick, type, alt }) {
  return (
    <button type={type} className={`button button--${alt}`} onClick={onClick}>
      <div className={`button__wrapper button__wrapper--${alt}`}>
        <img
          src={image}
          alt="Upload button"
          className={`button__image button__image--${alt}`}
        />
        <p className="button__text">{text}</p>
      </div>
    </button>
  );
}

export default Button;
