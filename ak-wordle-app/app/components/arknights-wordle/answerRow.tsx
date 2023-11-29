import React from "react";
import { GuessResult } from "~/wordle.server";
import AnswerBox from "./answerBox";

export default function AnswerRow(props: { guess: GuessResult }) {
    // const [guess, setGuess] = React.useState(guessResult);

    let guess: any = props.guess;

    // <p>{`${guess?.name} 
    // ${guess?.gender?.result} 
    // ${guess?.race?.result} 
    // ${guess?.allegiance?.result} 
    // ${guess?.profession?.result} 
    // ${guess?.cost?.result} 
    // ${guess?.rarity?.result} 
    // ${guess?.infected?.result}`}</p>

    delete guess['charId']
    delete guess['correct']

    return (
        <div className='flex flex-row justify-center'>
            {
                Object.keys(guess).map(key => (
                    key != 'name' 
                    ? 
                        <AnswerBox key={key} category={key} guess={guess[key as keyof typeof guess].guess} result={guess[key as keyof typeof guess].result}/>
                    : 
                        <span key={key} className='mx-2 my-1 h-16 w-20 p-1 leading-2 break-all justify-center'>{guess?.name}</span>             
                ))
            }
        </div>
    );
}