import React from 'react';
import { Range } from '~/wordle.server';

export default function AnswerBox(props: {category: string, guess: string | number | boolean, result: boolean | Range }) {
    const result = props.result;
    const guess = props.guess;

    // TODO: Fix this thing with the dumb enum stuff...

    let bg = 'green';
    if (typeof result === "boolean" && !result) {
        bg = 'red'
    } else if (typeof result === 'string' && result !== 'Correct') {
        if (result === 'Lower') {
            bg = 'yellow'
        } else { // result === Range.Higher
            bg = 'cyan'
        }
    }

    return (
        <div className='m-2'>
            <div className='flex flex-col' style={{'backgroundColor': bg}}>
                <span>{guess}</span>
                <span>{result}</span>
            </div>
        </div>
    );
}
