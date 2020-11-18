import styles from "./search.scss";
import SearchIcon from "../../public/icons/search.svg";
import { useState } from "react";

const Search = ({ onSubmit }) => {
  const [query, setQuery] = useState("");

  return (
    <div>
      <form
        className={styles.search}
        onSubmit={(e) => {
          e.preventDefault();
          console.log(query);
          onSubmit(query);
        }}
      >
        <SearchIcon />
        <input
                  className={styles.search__box}
                  placeholder="Search your state..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
        />
        <input type="submit" style={{ visibility: "hidden" }} />
      </form>
    </div>
  );
};

export default Search;
