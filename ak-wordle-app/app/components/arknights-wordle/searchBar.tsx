import { useActionData, useLoaderData, useSubmit } from "@remix-run/react";
import type { ActionFunctionArgs } from "@remix-run/node";
import React from "react";

type Props = {
    setResults: React.Dispatch<React.SetStateAction<any>>;
}

export default function SearchBar({setResults} : Props) {
    const loaderData: any = useLoaderData();
    const allOperators: string[] = loaderData.allOperators;
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
            const op_lower = op[0].toLowerCase();
            return (
                op_lower.startsWith(lower) || 
                op_lower.replace("'", "").startsWith(lower.replace("", ""))
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