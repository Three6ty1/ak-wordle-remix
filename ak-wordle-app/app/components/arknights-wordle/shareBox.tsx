import { GuessResult } from "~/wordle.server";
import React from 'react';
type Props = {
    guesses: GuessResult[];
}

export default function ShareBox({ guesses }: Props) { 
    const [shareArray, setShareArray] = React.useState<string[]>([])

    React.useEffect(() => {
        const generateShareArray = () => {
            let newShareArray = []
            for(const guess of guesses) {
                let newString = '';
                for (const category in guess) {
                    if (category === 'charId' || category === 'name' || category === 'correct') { continue }
        
                    const compare: any= guess[category as keyof typeof guess]
        
                    if (compare.result === 'Correct' || compare.result === true) {
                        newString += '🟩';
                    } else if (compare.result === false) {
                        newString += '🟥';
                    } else {
                        newString += compare.result === 'Higher' ? '⬆️' : '⬆️';
                    }
                }
                newShareArray.push(newString);
            }

            setShareArray(newShareArray);
        }

        generateShareArray();
    }, [])
   
    return (
        <div className='justify-center flex flex-col'>
            <span>Share your results!</span>
            {shareArray.map((guess, index) => (
                <span key={index}>{guess}</span>
            ))}
        </div>
    );
}