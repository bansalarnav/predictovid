import styles from "./search.scss";
import SearchIcon from "../../public/icons/search.svg";
import { useState, useEffect } from "react";
import Select from "react-select";
import stateNames from "../../data/stateNames.json";

const Search = ({ onSubmit }) => {
  const [query, setQuery] = useState("");
  const [options, setOptions] = useState([]);
  const selectStyles = {
		menu: (provided) => ({
			...provided,
			padding: '10',
      borderRadius: 10,
		}),

		control: (provided) => ({
			...provided,
      height: 60,
      width: 390,
      border: 'none'
		}),
  };

  useEffect(() => {
    const keys = Object.keys(stateNames);

    let array = [];

    keys.forEach(value => {
      array.push({ label: stateNames[value], value: value })
    });
    setOptions(array)
  }, [])
  
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
        <Select
          dropdownIndicator={<SearchIcon />}
          styles={selectStyles}
          placeholder="Select your state..."
          isSearchable={true}
          options={options}
          onChange={(value) => onSubmit(value.value)}
        />
        {/* <input
                  className={styles.search__box}
                  placeholder="Search your state..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
        />
        <input type="submit" style={{ visibility: "hidden", width: '0' }} /> */}
      </form>
    </div>
  );
};

export default Search;
