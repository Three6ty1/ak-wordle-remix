import React from "react";
import { GuessResult } from "~/wordle.server";

export default function AnswerRow(props: any) {
    // const [guess, setGuess] = React.useState(guessResult);

    const guess = props.guess

    console.log(props)

    return (
        <div>
            <p>{`${props.guess?.name} 
            ${guess?.gender?.result} 
            ${guess?.profession?.result} 
            ${guess?.cost?.result} 
            ${guess?.rarity?.result} 
            ${guess?.race?.result} 
            ${guess?.allegiance?.result} 
            ${guess?.infected?.result}`}</p>
        </div>
    );
}