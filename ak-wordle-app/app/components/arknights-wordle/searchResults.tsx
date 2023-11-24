
import React from 'react';

type Props = {
    results: string[];
}

export default function SearchResults({results} : Props) {
    const [guesses, setGuesses] = React.useState<string[]>([]);

    React.useEffect(() => {
        const isGuesses = localStorage.getItem('guesses');
        const guesses = (isGuesses) ? JSON.parse(isGuesses) : [];

        let newGuesses: string[] = [];
        
        for (const guess of guesses) {
            newGuesses.push(guess.name);
        }
        console.log(newGuesses);
        setGuesses(newGuesses);
    }, [])

    return (
        <div>
            {results.map((op, index) => {
                if (guesses.includes(op)) {
                    return <span key={index} className='text-red-200 italic'>{op}</span>
                } else {
                    return <span key={index}>{op}</span>
                }
            })}
        </div>
    );
}