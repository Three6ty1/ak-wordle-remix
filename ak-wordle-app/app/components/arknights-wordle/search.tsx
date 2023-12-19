import SearchBar from "./searchBar";
import React from 'react'
import ResultsBox from "./resultsBox";
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
        <div className='flex flex-col items-center w-full'>
            <SearchBar setResults={setResults} />
            <ResultsBox results={results} guesses={newGuesses} />
        </div>
    );
}
