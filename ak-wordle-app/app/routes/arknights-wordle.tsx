import { getOperatorStats, compareGuess, GuessResult, getAllOperatorNames, updateWins } from '~/wordle.server';
import { useLoaderData, useActionData } from '@remix-run/react';
import { ChosenOperators } from '@prisma/client';
import { ActionFunction } from '@remix-run/node';
import React from 'react';
import AnswerRow from '~/components/arknights-wordle/answerRow';
import { guessCategoryToolTips } from '~/helper/helper';
import Search from '~/components/arknights-wordle/search';
import ShareBox from '~/components/arknights-wordle/shareBox';
import Hints from '~/components/arknights-wordle/hints';
import LogoBlack from '~/../../public/logo_black.png';
import LogoWhite from '~/../../public/logo_white.png';

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
    const [isInputDelay, setIsInputDelay] = React.useState(false);

    React.useEffect(() => { 
        const updateGuesses = () => {
            if (actionData?.result) {
                setIsInputDelay(true)
                const isGuesses = localStorage.getItem('guesses');
                const guesses = (isGuesses) ? JSON.parse(isGuesses) : [];
                // Insert the newest guess at the first index of the answer row array
                let newGuesses = [actionData.result, ...guesses];
                localStorage.setItem('guesses', JSON.stringify(newGuesses));
                setGuesses(newGuesses);

                // Prevent the user from being able to input new guesses with an input delay, and to let the winning animation play fully
                // state change while this animation is occuring will stop the animation entirely.
                if (actionData.result.correct) {
                    setTimeout(() => setPlaying(1), 4000);
                    setTimeout(() => setIsInputDelay(false), 4000)
                    localStorage.setItem('playing', '1');
                } else {
                    setTimeout(() => setIsInputDelay(false), 2500)
                }
            }
        }

        const initGuesses = () => {
            const now = new Date().toDateString()

            const lastPlayed = localStorage.getItem('lastPlayed');
            // Refresh the guesses and set playing to true if the last played date is not the current date
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
        <main className='flex flex-col w-full justify-center items-center text-center font-sans p-5 pt-10'>
            <img style={{width: '40vh'}} src={`${LogoBlack}`}></img>
            <h1 className='font-bold text-4xl'>WORDLE</h1>
            <div className='mt-2'>
                <p>{`#${stats.gameId}, ${stats.date} (AEST)`}</p>
                <p>{`${stats.timesGuessed} Dokutah${stats.timesGuessed > 1 ? '\'s have' : ' has'} guessed the operator.`}</p>
            </div>
            {false && // TODO: Remove
                <p>{`Operator Id: ${stats.operatorId}`}</p>
            }
            <div className='flex justify-center align-middle w-full my-2'>
                <Hints amtGuesses={guesses.length}/>
            </div>
            {actionData?.error ? (
                <p className='text-red-500'>{actionData.error}</p>
            ) : null}

            {/** 
             * Using grid and col-start to force these elements to overlap one another 
             * This is so the search bar appears ontop of the answer row instead of pushing it down.
            */}
            <div className='grid justify-center w-full'>
                <div className='flex flex-col col-start-1 row-start-1 items-center w-[100vh] animate-fade-in'>
                    {playing === 0 && !isInputDelay && <Search guesses={guesses} />}
                </div>

                <div className='col-start-1 row-start-1 relative my-14'>
                    <div className='flex flex-row font-bold justify-center break-all'>
                        {guesses && (guesses.length) > 0 ?
                            Object.entries(guessCategoryToolTips).map((category, index) => (
                                <span key={index} className='tooltip flex h-20 w-20 m-2 items-center justify-center bg-bg_main whitespace-pre-line' data-tip={category[1]}>{category[0]}</span>
                            )) : null
                        }
                    </div>
                    
                    {guesses && (guesses.length) > 0 &&
                        guesses.map((guess: GuessResult, index) => (<AnswerRow key={guess.charId ? guess.charId : index} guess={guess} index={index}/>))
                    }
                </div>
            </div>

            {playing === 1 && !isInputDelay &&
                <div className='flex flex-col items-center animate-fade-in'>
                    <span>You guessed the operator!</span>
                    <ShareBox guesses={guesses} gameInfo={stats}/>
                </div>
            }
        </main>
        
    );
}