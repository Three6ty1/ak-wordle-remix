import { useActionData, useLoaderData, useSubmit } from "@remix-run/react";
import type { ActionFunctionArgs } from "@remix-run/node";
import React from "react";
import { GuessType, GuessTypeValue } from "~/helper/helper";

type Props = {
    setResults: React.Dispatch<React.SetStateAction<any>>;
}

export default function SearchBar({setResults} : Props) {
    const loaderData: any = useLoaderData();
    const allOperators: GuessType[] = loaderData.allOperators;
    const [input , setInput] = React.useState('');
    
    const actionData = useActionData<ActionFunctionArgs>();

    const handleChange = (value: string) => {
        setInput(value);

        if (value.trim() === '') {
            setResults([]);
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

        setResults(results);
    }

    // Reset search whenever a guess is submitted
    React.useEffect(() => {
        const resetInput = () => {
            setInput('');
            setResults([]);
        }
        resetInput();
    }, [actionData])

    return (
        <div className='items-center flex flex-row justify-center'>
            <input name='operator-guess' value={input} onChange={(e) => handleChange(e.target.value)} className='border-solid border-black border-2' type='text'/>
        </div>
    );
}