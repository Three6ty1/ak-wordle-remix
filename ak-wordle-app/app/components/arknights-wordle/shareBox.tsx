import { GuessResult } from "~/wordle.server";
import { Range, Correctness } from "~/helper/helper";
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
        
                    // Correctness and Range .corret's are the same, just added for clarity
                    if (compare.result === Range.Correct || compare.result === Correctness.Correct || compare.result === true) {
                        newString += '🟩';
                    } else if (compare.result === false || compare.result === Correctness.Wrong) {
                        newString += '🟥';
                    } else if (compare.result === Range.Lower) {
                        newString += '⬇️';
                    } else if (compare.result === Range.Higher) {
                        newString += '⬆️';
                    } else if (compare.result === Correctness.Half) {
                        newString += '🟨';
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