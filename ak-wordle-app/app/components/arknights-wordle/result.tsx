import { useSubmit } from "@remix-run/react";
import React from 'react';
import { GuessType, GuessTypeValue, ICON_DIR, getOperatorIconUrl } from "~/helper/helper";

type Props = {
    op: GuessType;
    hasGuessed: boolean;
}

export default function Result({op, hasGuessed}: Props) {
    let submit = useSubmit();
    const [_hasGuessed, setHasGuessed] = React.useState(hasGuessed);

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

    return (
        <div className='flex flex-row self-center w-full items-center'>
            <div className='flex w-1/2 justify-end pr-5'>
                <img src={url} alt={`${op[0]} operator icon`} width={25} height={25} />
            </div>
            <div className='flex w-1/2 justify-start' style={{'color': hasGuessed ? 'pink' : 'black'}} onClick={(e) => handleSubmit(e)}>{op[GuessTypeValue.name]}</div> 
        </div>
    );
}