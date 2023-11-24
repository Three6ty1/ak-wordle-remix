
import SearchBar from "./searchBar";
import React from 'react'
import SearchResults from "./searchResults";

export default function Search() {
    
    const [results, setResults] = React.useState([]);

    return (
        <div>
            <SearchBar setResults={setResults} />
            <SearchResults results={results} />
        </div>
    );
}
