import HintOperatorList from "./hintOperatorList";
import HintWorldMap from "./hintWorldMap";

type Props = {
    amtGuesses: number,
}

export enum HintBreakpoints {
    "one" = 3,
    "two" = 5,
    "three" = 8,
}

export default function Hints({ amtGuesses, } : Props) {
    // 3 guesses
    //  sort by rarity
    // 5 guesses
    //  sort by class
    //  species cheatsheet
    // 8 guesses
    //  reveal species in each region
    //  sort by archetype

    return (
        <div>
            <HintOperatorList amtGuesses={amtGuesses}/>
            <HintWorldMap />
        </div>
    )
}