
import React from 'react';

type Props = {
    results: string[];
}

export default function SearchResults({results} : Props) {
    const [guesses, setGuesses] = React.useState([]);

    React.useEffect(() => {
        const isGuesses = localStorage.getItem('guesses');
        const guesses = (isGuesses) ? JSON.parse(isGuesses) : [];
        setGuesses(guesses);
    }, [])

    return (
        <div>
            {results.map((op, index) => {
                if (op in guesses.values()) {
                    return <span key={index} className='text-gray-600'>{op}</span>
                } else {
                    return <span key={index}>{op}</span>
                }
            })}
        </div>
    );
}