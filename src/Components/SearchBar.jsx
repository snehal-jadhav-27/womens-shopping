import React, { useState } from "react";
import "./SearchBar.css";

function SearchBar() {

  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    console.log("Searching for:", search);
  };

  return (
    <form className="search-bar" onSubmit={handleSearch}>

      <input
        type="text"
        placeholder="Search for products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button type="submit">
        🔍 Search
      </button>

    </form>
  );
}

export default SearchBar;