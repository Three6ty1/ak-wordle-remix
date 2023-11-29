import { Range, Correctness } from "~/helper/helper";

export default function AnswerBox(props: {category: string, guess: string | number | boolean, result: boolean | Range | Correctness }) {
    const result = props.result;
    const guess = props.guess;

    const showResult = result == Range.Higher || result == Range.Lower;
    // TODO: Fix this thing with the dumb enum stuff...

    let bg = 'green';
    if (typeof result === "boolean" && !result) {
        bg = 'red'
    } else if (result === Range.Lower) {
        bg = 'pink';
    } else if (result === Range.Higher) {
        bg = 'cyan'
    } else if (result === Correctness.Half) {
        bg = 'yellow'
    } else if (result === Correctness.Wrong) {
        bg = 'red'
    }

    return (
        <div className='m-2'>
            <div className='flex flex-col' style={{'backgroundColor': bg}}>
                <span>{guess}</span>
                {showResult && <span>{result}</span>}
            </div>
        </div>
    );
}
