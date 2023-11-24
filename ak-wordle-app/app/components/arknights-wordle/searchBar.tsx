import { useLoaderData, useSubmit } from "@remix-run/react";
import React from "react";

type Props = {
    setResults: React.Dispatch<React.SetStateAction<any>>;
}

export default function SearchBar({setResults} : Props) {
    let submit = useSubmit();
    const loaderData: any = useLoaderData();
    const allOperators: string[] = loaderData.allOperators;
    const [input , setInput] = React.useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let $form = event.currentTarget;
        let formData = new FormData($form);
        const guesses  = localStorage.getItem('guesses');
        formData.set('guesses', guesses ? guesses : JSON.stringify([]));
        submit(formData, {method: 'POST'});
    }

    const handleChange = (value: string) => {
        setInput(value)

        if (value === '') {
            setResults([]);
            return;
        }
        
        const lower = value.toLowerCase()
        const results = allOperators.filter((op) => {
            return (
                op && 
                (op.toLowerCase().includes(lower) || 
                op.toLowerCase().replace("'", "").includes(lower)));
        })
        setResults(results);
    }

    return (
        <form method='post' onSubmit={handleSubmit} className='items-center flex flex-row justify-center'>
            <input name='operator-guess' value={input} onChange={(e) => handleChange(e.target.value)} className='border-solid border-black border-2' type='text' />
            <button type='submit' name="_action">Search</button>
        </form>
    );
}