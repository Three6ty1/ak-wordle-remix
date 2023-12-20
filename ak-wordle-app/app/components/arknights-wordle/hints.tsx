import HintHelp from "./hintHelp";
import HintOperatorList from "./hintOperatorList";
import HintWorldMap from "./hintWorldMap";
import React from 'react';

type Props = {
    amtGuesses: number,
}

export enum HintBreakpoints {
    "one" = 5,
    "two" = 8,
}

export default function Hints({ amtGuesses, } : Props) {
    // breakpoint one = 5
    //      operator list split into rarity
    //      Region cheatsheet
    // breakpoint two = 8
    //      operator list sorted by class and rarity
   
    return (
        <div className='flex flex-row w-1/2 justify-center'>
            <HintHelp />
            <HintOperatorList amtGuesses={amtGuesses} />
            <HintWorldMap amtGuesses={amtGuesses} />
        </div>
    )
}