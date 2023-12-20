import AnswerBox from "./answerBox";

type Props = {
    guess: any,
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
                            guess={guess[key as keyof typeof guess].guess}
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