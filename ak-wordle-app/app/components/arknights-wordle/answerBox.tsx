import { wordleColors, Range, Correctness, raceToolTips, costToolTips } from "~/helper/helper";

type Props = {
    category: string
    guess: string | number | boolean | number[]
    result: boolean | Range | Correctness
    index: number
    correct: boolean
    isAnimate: boolean
}   

export default function AnswerBox({category, guess, result, index, correct, isAnimate}: Props) {
    const showResult = result == Range.Higher || result == Range.Lower;
    let divStyle = 'flex flex-col mx-2 my-1 h-20 w-20 p-1 leading-2 break-all justify-center text-white'
    isAnimate ? (correct ? divStyle += ' opacity-0 animate-win ' : divStyle += ' opacity-0 animate-flip ') : 'opacity-1'

    let bg = wordleColors.correct;
    if (typeof result === "boolean" && !result) {
        bg = wordleColors.incorrect;
    } else if (result === Range.Lower) {
        bg = wordleColors.lower;
    } else if (result === Range.Higher) {
        bg = wordleColors.higher;
    } else if (result === Correctness.Half) {
        bg = wordleColors.half
    } else if (result === Correctness.Wrong) {
        bg = wordleColors.incorrect
    }

    return (
        <>
            {category === 'race' ?
                    <div className={`${divStyle} tooltip before:whitespace-pre-wrap before:content-[attr(data-tip)]`}
                        data-tip={raceToolTips[guess as keyof typeof raceToolTips]}
                        style={{'backgroundColor': bg, animationDelay: `${index*250}ms`}}
                    >
                        <span>{guess}</span>
                    </div>
                :
                    category === 'cost' ?
                        <div className={`${divStyle} tooltip before:whitespace-pre-wrap before:content-[attr(data-tip)]`}
                            data-tip={costToolTips[result as keyof typeof costToolTips]}
                            style={{'backgroundColor': bg, animationDelay: `${index*250}ms`}}
                        >
                            <span>{`E0: ${guess[0 as keyof typeof guess]}`}</span>
                            <span>{`E2: ${guess[1 as keyof typeof guess]}`}</span>
                            <span className='font-bold'>{result}</span>
                        </div>
                    :
                        <div className={`${divStyle}`} style={{"backgroundColor" : bg, animationDelay: `${index*250}ms`}}>
                            <span>{guess}</span>
                            {showResult && <span className='font-bold'>{result}</span>}
                        </div>

            }
        </>
        
    );
}
