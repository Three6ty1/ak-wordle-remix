import { useSubmit } from "@remix-run/react";
import React from 'react';
import { GuessType, GuessTypeValue, getOperatorIconUrl } from "~/helper/helper";

type Props = {
    op: GuessType;
    hasGuessed: boolean;
}

export default function Result({op, hasGuessed}: Props) {
    let submit = useSubmit();
    const [_hasGuessed, setHasGuessed] = React.useState(hasGuessed);

    // When a name is clicked in the list, it counts that as a selection for the character
    // Submit will send a request to the Remix action hook
    // The information is sent to the route file to do any necessary state changes.
    const handleSubmit = (event: React.MouseEvent) => {
        event.preventDefault();

        setHasGuessed(true);
        hasGuessed = true;

        const guesses  = localStorage.getItem('guesses');
        let data = {
            'operator-guess': event.currentTarget.textContent,
            'guesses': guesses ? guesses : JSON.stringify([]),
        };
        submit(data, {method: 'POST'});
    }

    const url = getOperatorIconUrl(op[GuessTypeValue.charId], op[GuessTypeValue.rarity]);

    let textStyle = ' '
    // Ternary operator for this line BREAKS the code
    if (_hasGuessed) { textStyle += 'text-higher' }

    return (
        <div className='flex flex-row self-center w-full items-center m-1'>
            <div className='flex w-1/2 justify-end pr-5'>
                <img src={url} alt={`${op[0]} operator icon`} width={40}/>
            </div>
            <div className={'flex w-1/2 justify-start text-start text-2xl' + textStyle} onClick={(e) => handleSubmit(e)}>{op[GuessTypeValue.name]}</div> 
        </div>
    );
}