import React from "react";
import { GuessResult } from "~/wordle.server";
import AnswerBox from "./answerBox";
import { getOperatorIconUrl } from "~/helper/helper";

export default function AnswerRow(props: { guess: GuessResult, index: number }) {
    let guess: any = props.guess;

    // <p>{`${guess?.name} 
    // ${guess?.gender?.result} 
    // ${guess?.race?.result} 
    // ${guess?.allegiance?.result} 
    // ${guess?.profession?.result} 
    // ${guess?.cost?.result} 
    // ${guess?.rarity?.result} 
    // ${guess?.infected?.result}`}</p>

    const isGuesses = localStorage.getItem('guesses');
    const guesses = (isGuesses) ? JSON.parse(isGuesses) : [];
    const op = guesses[props.index]
    const url = getOperatorIconUrl(op['charId'], op['rarity'].guess)

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
                        <div key={key} className='tooltip flex mx-2 my-1 h-20 w-20 p-1 break-all items-center justify-end bg-bg_main' data-tip={guess?.name}>
                            <img src={url} />
                        </div>             
                ))
            }
        </div>
    );
}