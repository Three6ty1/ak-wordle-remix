import { getOperatorStats, compareGuess, getAllOperators, GuessResult } from '~/wordle.server';
import { useLoaderData, useFetcher, useActionData, useSubmit } from '@remix-run/react';
import { ChosenOperators } from '@prisma/client';
import { ActionFunction } from '@remix-run/node';
import React from 'react';
import AnswerRow from '~/components/arknights-wordle/answerRow';
import { GUESS_CATEGORIES } from '~/helper/helper';

export const loader = async() => {
    console.log("Getting operator stats")
    return await getOperatorStats();
}

export const action: ActionFunction = async({ request, }) => {
    const form = await request.formData();
    const guess = String(form.get('operator-guess'));

    if (guess) {   
        console.log("WHAT")
        const formGuesses = JSON.parse(String(form.get('guesses')));
        console.log(formGuesses)
        if (formGuesses.length > 0) {
            const guesses = formGuesses.map((x: { name: string; }) => x.name);
            if (guesses.includes(guess)) {   
                return { error: 'Operator already guessed previously'};
            }
        }

        console.log("Comparing guess")
        const res = await compareGuess(guess);
        console.log("Got result")
        console.log(res)
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

    const stats: ChosenOperators = useLoaderData();
    let submit = useSubmit();
    const actionData = useActionData<typeof action>();
    const [guesses, setGuesses] = React.useState<GuessResult[]>();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        let $form = event.currentTarget;
        let formData = new FormData($form);
        const guesses  = localStorage.getItem('guesses');
        formData.set('guesses', guesses ? guesses : JSON.stringify([]));
        submit(formData, {method: 'POST'});
    }

    React.useEffect(() => { 
        const updateGuesses = () => {
            if (actionData?.result) {
                const isGuesses = localStorage.getItem('guesses');
                const guesses = (isGuesses) ? JSON.parse(isGuesses) : [];
                console.log("Action data proc")
                localStorage.setItem('guesses', JSON.stringify([...guesses, actionData.result]));
                const newGuesses = [...guesses, actionData.result];
                setGuesses(newGuesses);
            }
        }

        const initGuesses = () => {
            const now = new Date().toDateString()
            if (stats.date != now) {
                localStorage.setItem('guesses', JSON.stringify([]));
                localStorage.setItem('lastPlayed', now);
                setGuesses([]);
            } else {
                // The reason for storing on both localstorage and state
                // is to make sure state persists through refresh
                // and that the page updates when a guess is made
                // because localstorage cannot be accessed server side 
                const isGuesses = localStorage.getItem('guesses');
                const guesses = (isGuesses) ? JSON.parse(isGuesses) : [];
                setGuesses(guesses);
            }
        }

        console.log("Checking data")
        initGuesses();
        updateGuesses();

        /*
        window.addEventListener('storage', checkData);
        return () => {
            window.removeEventListener('storage', checkData);
        }*/
    }, [actionData])

    return (
        <main className='justify-center align-middle items-center content-center text-center'>
            <h1>Arknights Wordle</h1>
            <p>{`${stats.gameId} ${stats.date} ${stats.operatorId} ${stats.timesGuessed}`}</p>
            <br/>
            {actionData?.error ? (
                <p className='text-red-500'>{actionData.error}</p>
            ) : null}
            <form method='post' onSubmit={handleSubmit}className='items-center flex flex-row justify-center'>
                <input name='operator-guess' className='border-solid border-black border-2' type='text' />
                <button type='submit' name="_action">Search</button>
            </form>
            <br/>
            
            {guesses && (guesses.length) > 0 ?
                GUESS_CATEGORIES.map((category, index) => (
                    <span key={index} className='m-2'>{category}</span>
                )) : null
            }
            {guesses && (guesses.length) > 0 ? 
                guesses.map((guess: GuessResult, index) => (
                    <AnswerRow key={index} guess={guess}/>
                )) : null
            }
        </main>
        
    );
}