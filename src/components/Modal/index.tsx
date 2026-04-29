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
    <div className="modal-background">
      <div className="modal">
        {Icon && <Icon size={70} />}
        <p className="title">{title}</p>
        <p className="description">{description}</p>
        <div className="button-container">
          <button className="accept-button" onClick={onConfirm}>
            OK
          </button>

          {onCancel && (
            <button className="decline-button" onClick={onCancel}>
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal;
