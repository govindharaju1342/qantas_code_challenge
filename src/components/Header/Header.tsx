import React, { useContext } from "react";
import { useLocation } from "react-router-dom";

import { SearchContext } from "../../context/SearchContext";

import "./Header.css";

const Header: React.FC = () => {
  const searchContext = useContext(SearchContext);
  const location = useLocation();

  if (!searchContext) {
    throw new Error("SearchContext must be used within a SearchProvider");
  }

  const { searchTerm, setSearchTerm } = searchContext;

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const isDetailsPage = location.pathname.startsWith("/details");

  return (
    <div className="header">
      <div>
        <img
          className="logo"
          src="https://www.qantas.com/content/dam/qantas/logos/qantas-masterbrand-logo-40px.svg"
          alt="qantas logo"
        />
        <img
          className="logo_one_world"
          src="https://www.qantas.com/content/dam/qantas/icons/oneworld.svg"
          alt="oneworld blue icon"
        />
      </div>
      {!isDetailsPage && (
        <input
          type="text"
          className="search-box"
          placeholder="Search Airport..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      )}
    </div>
  );
};

export default Header;
