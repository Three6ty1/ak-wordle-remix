import { Range, Correctness } from "~/helper/helper";

export default function AnswerBox(props: {category: string, guess: string | number | boolean, result: boolean | Range | Correctness }) {
    const result = props.result;
    const guess = props.guess;
    const category = props.category;

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
    } else if (category === 'Name') {
        bg = 'white'
    }

    return (
        <div className='flex flex-col mx-2 my-1 h-16 w-20 p-1 leading-2 break-all justify-center' style={{'backgroundColor': bg}}>
            <span>{guess}</span>
            {showResult && <span>{result}</span>}
        </div>
    );
}
