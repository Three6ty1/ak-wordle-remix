import { useActionData, useLoaderData, useSubmit } from "@remix-run/react";
import type { ActionFunctionArgs } from "@remix-run/node";
import React from "react";
import { GuessType, GuessTypeValue } from "~/helper/helper";

type Props = {
    setResults: React.Dispatch<React.SetStateAction<any>>;
}

export default function SearchBar({setResults} : Props) {
    const submit = useSubmit();
    const loaderData: any = useLoaderData();
    const allOperators: GuessType[] = loaderData.allOperators;
    const [input , setInput] = React.useState('');
    const [_results, _setResults] = React.useState<GuessType[]>([]);
    const actionData = useActionData<ActionFunctionArgs>();

    const handleChange = (value: string) => {
        setInput(value);

        if (value.trim() === '') {
            setResults([])
            _setResults([])
            return;
        }
        
        const lower = value.toLowerCase().trim();

        const results = allOperators.filter((op) => {
            const op_lower = op[GuessTypeValue.name].toLowerCase();
            return (
                op_lower.startsWith(lower) || 
                op_lower.replace("'", "").startsWith(lower.replace("", "")) || 
                op_lower.replace("ł", "l").startsWith(lower) || // special cases for Pozyomka and Mylnar
                op_lower.replace("ë", "yo").startsWith(lower)
            );
        });
        _setResults(results);
        setResults(results);
    }

    const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') {
            const guesses  = localStorage.getItem('guesses');
            let data = {
                'operator-guess': _results.length > 0 ? _results[0][GuessTypeValue.name] : '',
                'guesses': guesses ? guesses : JSON.stringify([]),
            };
            submit(data, {method: 'POST'});
        }
    }

    // Reset search whenever a guess is submitted
    React.useEffect(() => {
        const resetInput = () => {
            setInput('');
            _setResults([]);
            setResults([]);
        }
        resetInput();
    }, [actionData])

    return (
        <div className='items-center flex flex-row justify-center w-full'>
            <input name='operator-guess'
            value={input}
            onChange={(e) => handleChange(e.target.value)}
            onKeyDown={(e) => handleKey(e)}
            placeholder='Start typing an operator name'
            className='input input-bordered w-[80vw] md:w-[30vw] text-center'
            type='text'/>
        </div>
    );
}