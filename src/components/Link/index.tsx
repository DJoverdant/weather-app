import { type Icon } from "@phosphor-icons/react";
import "./styles.css";

interface LinkProps {
  ref: string;
  icon?: Icon;
  text?: string;
}

function Link({ ref, icon: Icon, text }: LinkProps) {
  return (
    <a href={ref} target="_blank">
      {Icon && <Icon size={20} />}
      {text && text}
    </a>
  );
}

export default Link;
