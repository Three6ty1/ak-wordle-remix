import { useActionData, useLoaderData, useSubmit } from "@remix-run/react";
import React from "react";

type Props = {
    setResults: React.Dispatch<React.SetStateAction<any>>;
}

export default function SearchBar({setResults} : Props) {
    const actionData: any = useActionData();
    const loaderData: any = useLoaderData();
    const allOperators: string[] = loaderData.allOperators;
    const [input , setInput] = React.useState('');
    
    const handleChange = (value: string) => {
        setInput(value)

        if (value.trim() === '') {
            setResults([]);
            return;
        }
        
        const lower = value.toLowerCase().trim()
        const results = allOperators.filter((op) => {
            return (
                op && 
                (op.toLowerCase().includes(lower) || 
                op.toLowerCase().replace("'", "").includes(lower)));
        })
        setResults(results);
    }

    return (
        <div className='items-center flex flex-row justify-center'>
            <input name='operator-guess' value={input} onChange={(e) => handleChange(e.target.value)} className='border-solid border-black border-2' type='text' />
        </div>
    );
}