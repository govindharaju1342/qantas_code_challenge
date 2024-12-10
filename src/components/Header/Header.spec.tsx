import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import Header from "./Header";

describe("Header Component", () => {
  const mockSetSearchTerm = jest.fn();

  const renderHeader = (searchTerm = "") => {
    render(
      <MemoryRouter>
        <SearchContext.Provider
          value={{
            searchTerm,
            setSearchTerm: mockSetSearchTerm,
          }}
        >
          <Header />
        </SearchContext.Provider>
      </MemoryRouter>
    );
  };

  it("calls setSearchTerm on input change", () => {
    renderHeader();

    const input = screen.getByPlaceholderText("Search Airport...");
    fireEvent.change(input, { target: { value: "new search" } });

    expect(mockSetSearchTerm).toHaveBeenCalledWith("new search");
  });
});
