import { getOperatorStats, compareGuess } from '~/wordle.server';
import { useLoaderData, useFetcher, useActionData } from '@remix-run/react';
import { ChosenOperators } from '@prisma/client';
import { ActionFunction } from '@remix-run/node';

export const loader = async() => { 
    return await getOperatorStats();
}

export const action: ActionFunction = async({ request }) => {
    const form = await request.formData();
    const guess = String(form.get('operator-guess'));
    if (guess) {   
        const res = await compareGuess(guess);
        console.log(res)
        return res;
    } 
    
    return { error: 'Please enter an operator name' }
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

    const stats:ChosenOperators = useLoaderData()
    const actionData = useActionData<typeof action>();

    return (
        <main className='justify-center align-middle items-center content-center text-center'>
            <h1>Arknights Wordle</h1>
            <p>{`${stats.gameId} ${stats.date} ${stats.operatorId} ${stats.timesGuessed}`}</p>
            <br/>
            <br/>
            {actionData?.error ? (
                <p className='text-red-500'>{actionData.error}</p>
            ) : null}
            <form method='post' className='items-center flex flex-col'>
                <input name='operator-guess' className='border-solid border-black border-2' type='text' />
                <button type='submit' name="_action">Search</button>
            </form>
        </main>
        
    );
}