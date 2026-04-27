import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import { useState } from "react";
import "./styles.css";

interface SearchProps {
  placeholder?: string;
}

function Search({ placeholder }: SearchProps) {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="search">
      <MagnifyingGlassIcon size={40} style={{ alignSelf: "center" }} />
      <input
        id="query"
        type="search"
        placeholder={placeholder}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </div>
  );
}

export default Search;
