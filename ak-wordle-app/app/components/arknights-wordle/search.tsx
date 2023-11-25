
import SearchBar from "./searchBar";
import React from 'react'
import SearchResults from "./searchResults";
import { GuessResult } from "~/wordle.server";

type Props = {
    guesses: GuessResult[];
}

export default function Search({ guesses, }: Props) {
    const [results, setResults] = React.useState([]);

    let newGuesses: string[] = [];
    
    for (const guess of guesses) {
        newGuesses.push(guess.name);
    }

    return (
        <div>
            <SearchBar setResults={setResults} />
            <SearchResults results={results} guesses={newGuesses} />
        </div>
    );
}
