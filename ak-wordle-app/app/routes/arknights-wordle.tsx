import { getOperatorStats, compareGuess, getAllOperators } from '~/wordle.server';
import { useLoaderData, useFetcher, useActionData, useSubmit } from '@remix-run/react';
import { ChosenOperators } from '@prisma/client';
import { ActionFunction } from '@remix-run/node';
import React from 'react';

export const loader = async() => {
    return await getOperatorStats();
}

export const action: ActionFunction = async({ request, }) => {
    const form = await request.formData();
    const guess = String(form.get('operator-guess'));

    if (guess) {   
        const guesses: any = form.get('guesses');
        if (guesses && guesses.includes(guess)) {
            return { error: 'Operator already guessed previously'};
        }

        const res = await compareGuess(guess);
        return res;
    } 
    
    return { error: 'Please enter an operator name' };
}

export default function ArknightsWordle() {
    /**
     * Logic
     * type answer
     *      every time the user types, autocorrect to the closest champion.
     *      autocorrect from start? or autocorrect from middle of word?
     *      have a grid of all the operators that exist with mini icons?
     *      grey out all the operators that have already been guessed
     * submit answer
     *      fetch to the server
     *      return back the diff of each category
     * get result of guess
     *      animation to show the diff of each category loop back to type answer in logic
     * correct guess
     *      show animation for getting all correct
     * show results
     *      based on the guesses and the correctness of each guess, make a unicode viable and discord viable
     *      copy and paste thing for results
     */

    const stats:ChosenOperators = useLoaderData();
    let submit = useSubmit();
    const actionData = useActionData<typeof action>();

    const isGuesses = localStorage.getItem('guesses')
    const guesses:string[] = isGuesses ? JSON.parse(isGuesses) : [];

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        let $form = event.currentTarget;
        let formData = new FormData($form);
        let guesses  = localStorage.getItem('guesses')
        formData.set('guesses', guesses ? guesses : JSON.stringify([]));
        submit(formData, {method: 'POST'});
    }

    React.useEffect(() => {
        const updateGuesses = () => {
            if (actionData?.operator) {
                const isGuesses = localStorage.getItem('guesses');
                const guesses = (isGuesses) ? JSON.parse(isGuesses) : [];
                guesses.push(actionData.operator.name)
                localStorage.setItem('guesses', JSON.stringify(guesses));
                
            }
        }

        const now = new Date().toDateString()
        if (stats.date != now) {
            localStorage.setItem('guesses', JSON.stringify([]));
            localStorage.setItem('lastPlayed', now);
        }

        updateGuesses();
    }, [actionData])

    return (
        <main className='justify-center align-middle items-center content-center text-center'>
            <h1>Arknights Wordle</h1>
            <p>{`${stats.gameId} ${stats.date} ${stats.operatorId} ${stats.timesGuessed}`}</p>
            <br/>
            
            {guesses.length > 0 ? 
                guesses.map((guess, index) => (
                    <p key={index}>{guess}</p>
                ))
                    : null
            }

            <br/>
            {actionData?.error ? (
                <p className='text-red-500'>{actionData.error}</p>
            ) : null}
            <form method='post' onSubmit={handleSubmit}className='items-center flex flex-row justify-center'>
                <input name='operator-guess' className='border-solid border-black border-2' type='text' />
                <button type='submit' name="_action">Search</button>
            </form>
            
        </main>
        
    );
}