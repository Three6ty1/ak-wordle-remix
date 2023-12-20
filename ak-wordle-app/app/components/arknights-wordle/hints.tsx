import HintHelp from "./hintHelp";
import HintOperatorList from "./hintOperatorList";
import HintWorldMap from "./hintWorldMap";

type Props = {
    amtGuesses: number,
}

export enum HintBreakpoints {
    "one" = 5,
    "two" = 8,
}

export default function Hints({ amtGuesses, } : Props) {
    // 5 guesses
    //  sort by class
    //  species cheatsheet
    // 8 guesses
    //  reveal species in each region
    //  sort by archetype

    return (
        <div className='flex flex-row w-1/2 justify-center'>
            <HintHelp />
            <HintOperatorList amtGuesses={amtGuesses}/>
            <HintWorldMap amtGuesses={amtGuesses}/>
        </div>
    )
}