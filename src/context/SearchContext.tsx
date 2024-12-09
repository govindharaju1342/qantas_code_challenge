import React, { createContext, useState, ReactNode } from 'react';

interface SearchContextProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
}

export const SearchContext = createContext<SearchContextProps | undefined>(undefined);

export const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [searchTerm, setSearchTerm] = useState<string>('');

    return (
        <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
            {children}
        </SearchContext.Provider>
    );
};