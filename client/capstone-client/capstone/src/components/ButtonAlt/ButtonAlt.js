import "./ButtonAlt.scss";

function ButtonAlt({ image, text }) {
  return (
    <div className="button__container">
      <img src={image} alt={`${text} button`} className="button__icon" />
      <p className="button__text">{text}</p>
    </div>
  );
}

export default ButtonAlt;
