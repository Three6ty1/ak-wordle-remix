import { GuessResult } from "~/wordle.server";
import AnswerBox from "./answerBox";

type Props = {
    guess: GuessResult,
    index: number
}

export default function AnswerRow({ guess, index } : Props) {
    return (
        <div className='flex flex-row justify-center'>
            {
                Object.keys(guess).map((key, boxIndex) => (
                    key != 'charId' && key != 'correct' ? 
                        <AnswerBox
                            key={key}
                            category={key}
                            /** @ts-ignore */
                            guess={guess[key as keyof typeof guess].guess}
                            /** @ts-ignore */
                            result={guess[key as keyof typeof guess].result}
                            boxIndex={boxIndex}
                            rowIndex={index}
                        />
                    : null          
                ))
            }
        </div>
    );
}