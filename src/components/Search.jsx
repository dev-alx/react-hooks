import React from "react";

const mystyle = {    
    backgroundColor: "#e3f2fd",
    
  };

const Search = ({ search, searchInput, handleSearch }) => {
  return (
    <nav className="navbar navbar-light" >
      <span className="navbar-brand mb-0 h1">Search Rick and Morty Characters</span>
      <form class="form-inline">
        <input
          className="form-control mr-sm-2"
          type="search"
          type="text"
          value={search}
          ref={searchInput}
          onChange={handleSearch}
        />
      </form>
    </nav>
    // <div className="Search">

    // </div>
  );
};

export default Search;
