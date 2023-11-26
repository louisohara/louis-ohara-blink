import "./Modal.scss";
import Button from "../Button/Button";
import search from "../../assets/Icons/search-24px.svg";
import close from "../../assets/Icons/close-24px.svg";
import { useState } from "react";

export default function Modal(innerhtml) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <Button image={search} onClick={handleShow} />
      {show && (
        <div className="modal">
          <Button image={close} onClick={handleClose} />
          <>{innerhtml}</>
        </div>
      )}
    </div>
  );
}
