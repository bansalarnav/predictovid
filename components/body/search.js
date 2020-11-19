import styles from "./search.scss";
import SearchIcon from "../../public/icons/search.svg";
import { useState, useEffect } from "react";
import Select from "react-select";
import stateNames from "../../data/stateNames.json";

const Search = ({ onSubmit }) => {
  const [query, setQuery] = useState("");
  const [options, setOptions] = useState([]);


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
        <input type="submit" style={{ visibility: "hidden", width: '0' }} />
      </form>
    </div>
  );
};

export default Search;
