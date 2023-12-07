import "./Input.scss";

function Input({ label, name, type, onChange, value, accept, alt }) {
  return (
    <div className="field">
      <label htmlFor={name} className={`field__label field__label--${alt}`}>
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        className={`field__input field__input--${alt}`}
        value={value}
        onChange={onChange}
        accept={accept}
      />
    </div>
  );
}

export default Input;
