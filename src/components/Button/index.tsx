import { type Icon } from "@phosphor-icons/react";
import "./styles.css";

interface ButtonProps {
  text?: string;
  icon?: Icon;
  disabled?: boolean;
  onClick: () => void;
}

function Button({ text, icon: Icon, onClick, disabled }: ButtonProps) {
  return (
    <button className="button" onClick={onClick} disabled={disabled}>
      <span className="button-content">
        {Icon && <Icon size={20} style={{ verticalAlign: "middle" }} />}
        {text && <span className="button-text">{text}</span>}
      </span>
    </button>
  );
}

export default Button;
