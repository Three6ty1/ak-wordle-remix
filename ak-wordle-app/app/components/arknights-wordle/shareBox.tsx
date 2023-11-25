import { GuessResult } from "~/wordle.server";
import React from 'react';
import { ChosenOperators } from "@prisma/client";
type Props = {
    guesses: GuessResult[];
    gameInfo: ChosenOperators;
}

export default function ShareBox({ guesses, gameInfo }: Props) { 
    const [shareString, setShareString] = React.useState('')

    React.useEffect(() => {
        const generateshareString = () => {
            let newString = '';
            for(const guess of guesses) {
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
                newString += '\n';
            }

            setShareString(newString);
        }

        generateshareString();
    }, [])

    const handleShare = () => {
        const newString = `Arknights Wordle #${gameInfo.gameId}\n` + shareString;
        navigator.clipboard.writeText(newString);
    }
   
    return (
        <div className='justify-center flex flex-col'>
            <span className='underline hover:cursor-pointer' onClick={() => handleShare()}>
                Share your results!
            </span>
            <span className='whitespace-pre-line'>{shareString}</span>
        </div>
    );
}