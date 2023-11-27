import { useSubmit } from "@remix-run/react";
import React from 'react';
import { ICON_DIR } from "~/helper/helper";

type Props = {
    op: [string, string, number],
    hasGuessed: boolean,
}

export default function Result({op, hasGuessed}: Props) {
    let submit = useSubmit();
    const [_hasGuessed, setHasGuessed] = React.useState(hasGuessed);
    const [icon, setIcon] = React.useState<string>();

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

    React.useEffect(() => {
        const fetchIcons = async() => {
            let res;
            if (op[2] > 3) {
                res = await fetch(ICON_DIR + op[1] + '_2.png');
            } else {
                res = await fetch(ICON_DIR + op[1] + '.png');
            }

            const iconBlob = await res.blob();
            const iconObjectURL = URL.createObjectURL(iconBlob);
            setIcon(iconObjectURL);
        }
        
        fetchIcons();
    }, [])

    return (
        <div className='flex flex-row self-center'>
            <img src={icon} alt={`${op[0]} operator icon`} width={25} height={25}></img>
            <div style={{'color': hasGuessed ? 'pink' : 'black'}} onClick={(e) => handleSubmit(e)}>{op[0]}</div> 
        </div>
        
    );
}