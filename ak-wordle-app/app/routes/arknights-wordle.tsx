import { getOperatorStats, compareGuess, GuessResult, getAllOperatorNames, updateWins } from '~/wordle.server';
import { useLoaderData, useActionData } from '@remix-run/react';
import { ChosenOperators } from '@prisma/client';
import { ActionFunction } from '@remix-run/node';
import React from 'react';
import AnswerRow from '~/components/arknights-wordle/answerRow';
import { GUESS_CATEGORIES } from '~/helper/helper';
import Search from '~/components/arknights-wordle/search';
import ShareBox from '~/components/arknights-wordle/shareBox';

export const loader = async() => {
    console.log("Getting operator stats and all operators")
    return {stats: await getOperatorStats(), allOperators: await getAllOperatorNames()}
}

export const action: ActionFunction = async({ request, }) => {
    const form = await request.formData();
    const guess = String(form.get('operator-guess'));
    if (guess) {   
        const formGuesses = JSON.parse(String(form.get('guesses')));
        if (formGuesses.length > 0) {
            const guesses = formGuesses.map((x: { name: string; }) => x.name);
            if (guesses.includes(guess)) {   
                return { error: 'Operator already guessed previously'};
            }
        }

        console.log("Comparing guess")
        const res = await compareGuess(guess);
        console.log("Got result")

        if (res.result?.correct === true) {
            updateWins();
        }

        return res;
    } 
    
    return { error: 'Please enter an operator name' };
}

export default function ArknightsWordle() {
    const loaderData: any = useLoaderData();
    const stats: ChosenOperators = loaderData?.stats;
    const actionData = useActionData<typeof action>();
    const [guesses, setGuesses] = React.useState<GuessResult[]>([]);
    const [playing, setPlaying] = React.useState(0);

    React.useEffect(() => { 
        const updateGuesses = () => {
            if (actionData?.result) {
                const isGuesses = localStorage.getItem('guesses');
                const guesses = (isGuesses) ? JSON.parse(isGuesses) : [];
                const newGuesses = [...guesses, actionData.result];
                localStorage.setItem('guesses', JSON.stringify(newGuesses));
                setGuesses(newGuesses);

                if (actionData.result.correct) {
                    setPlaying(1);
                    localStorage.setItem('playing', '1');
                }
            }
        }

        const initGuesses = () => {
            const now = new Date().toDateString()

            const lastPlayed = localStorage.getItem('lastPlayed');
            if (now != lastPlayed) {
                localStorage.setItem('guesses', JSON.stringify([]));
                localStorage.setItem('lastPlayed', now);
                localStorage.setItem('playing', '0');
                setPlaying(0);
                setGuesses([]);
            } else {
                // The reason for storing on both localstorage and state
                // is to make sure state persists through refresh
                // and that the page updates when a guess is made
                // because localstorage cannot be accessed server side 
                const isGuesses = localStorage.getItem('guesses');
                const guesses = (isGuesses) ? JSON.parse(isGuesses) : [];
                const isPlaying = localStorage.getItem('playing');
                const playing = (isPlaying) ? JSON.parse(isPlaying) as number: 0;

                setPlaying(playing);
                setGuesses(guesses);
            }
        }
        initGuesses();
        updateGuesses();

    }, [actionData])

    return (
        <main className='justify-center align-middle items-center content-center text-center'>
            <h1>Arknights Wordle</h1>
            {false &&
                <p>{`Game number: ${stats.gameId} Date: ${stats.date} Operator Id: ${stats.operatorId} Times guessed: ${stats.timesGuessed}`}</p>
            }
            
            <br/>
            {actionData?.error ? (
                <p className='text-red-500'>{actionData.error}</p>
            ) : null}
            
            {playing === 0 ? 
                <Search guesses={guesses} />
            :
                <>
                    <span>You guessed the operator!</span>
                    <br />
                    <br />
                    <ShareBox guesses={guesses} gameInfo={stats}/>
                </>
            }
            
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