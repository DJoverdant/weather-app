import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import "./styles.css";

interface InputProps {
  placeholder?: string;
}

function Input({ placeholder }: InputProps) {
  return (
    <div className="search-box">
      <MagnifyingGlassIcon size={30} />
      <input
        id="query"
        type="search"
        placeholder={placeholder}
        name="searchbar"
      />
    </div>
  );
}

export default Input;
