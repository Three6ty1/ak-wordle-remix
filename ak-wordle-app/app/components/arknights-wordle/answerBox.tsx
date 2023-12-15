import { wordleColors, Range, Correctness, raceToolTips } from "~/helper/helper";

export default function AnswerBox(props: {category: string, guess: string | number | boolean | number[], result: boolean | Range | Correctness }) {
    const result = props.result;
    const guess = props.guess;
    const category = props.category;

    const showResult = result == Range.Higher || result == Range.Lower;
    // TODO: Fix this thing with the dumb enum stuff...

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
                    <div className='flex flex-col mx-2 my-1 h-16 w-20 p-1 leading-2 break-all justify-center text-white tooltip'
                        data-tip={raceToolTips[guess as keyof typeof raceToolTips]}
                        style={{'backgroundColor': bg}}
                    >
                        <span>{guess}</span>
                    </div>
                :
                    <div className='flex flex-col mx-2 my-1 h-16 w-20 p-1 leading-2 break-all justify-center text-white' style={{'backgroundColor': bg}}>
                        {category === 'cost' ?
                            <div className='flex flex-col leading-tight'>
                                <span>{`E0: ${guess[0 as keyof typeof guess]}`}</span>
                                <span>{`E2: ${guess[1 as keyof typeof guess]}`}</span>
                            </div>
                        :
                            <span>{guess}</span>
                        }
                        {showResult && <span>{result}</span>}
                    </div>
            }
        </>
        
    );
}
