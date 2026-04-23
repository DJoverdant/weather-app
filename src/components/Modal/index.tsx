import { type Icon } from "@phosphor-icons/react";
import "./styles.css";

interface ModalProps {
  title: string;
  description?: string;
  icon?: Icon;
  onConfirm: () => void;
  onCancel?: () => void;
}

function Modal({
  title,
  description,
  icon: Icon,
  onConfirm,
  onCancel,
}: ModalProps) {
  return (
    <div className="modalBackground">
      <div className="modal">
        {Icon && <Icon size={70} />}
        <p className="title">{title}</p>
        <p className="description">{description}</p>
        <div className="buttonContainer">
          <button className="acceptButton" onClick={onConfirm}>
            OK
          </button>

          {onCancel && (
            <button className="declineButton" onClick={onCancel}>
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal;
