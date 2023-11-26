import "./ButtonAlt.scss";

function ButtonAlt({ image, text }) {
  return (
    <div className="button-alt__container">
      <div className="button-alt__wrapper">
        <img src={image} alt={`${text} button`} className="button-alt__icon" />
        <p className="button-alt__text">{text}</p>
      </div>
    </div>
  );
}

export default ButtonAlt;
