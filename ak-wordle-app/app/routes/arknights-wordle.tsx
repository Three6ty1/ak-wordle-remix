import { getOperatorStats, compareGuess, GuessResult, getAllOperatorNames, updateWins } from '~/wordle.server';
import { useLoaderData, useActionData } from '@remix-run/react';
import { ChosenOperators } from '@prisma/client';
import { ActionFunction } from '@remix-run/node';
import React, { BaseSyntheticEvent } from 'react';
import AnswerRow from '~/components/arknights-wordle/results/answerRow';
import { guessCategoryToolTips } from '~/helper/helper';
import Search from '~/components/arknights-wordle/search/search';
import ShareBox from '~/components/arknights-wordle/share/shareBox';
import Hints from '~/components/arknights-wordle/hints/hints';
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
    const [darkMode, setDarkMode] = React.useState(false);

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

        const initTheme = () => {
            const isTheme = localStorage.getItem('data-theme');
            const theme: string = (isTheme) ? isTheme : 'light';
            document.getElementById('ak-wordle-root')?.setAttribute('data-theme', theme);
            if (theme === 'dark') {
                document.getElementById('theme-checkbox')?.setAttribute('checked', '');
                setDarkMode(true)
            }   
        }

        initGuesses();
        updateGuesses();
        initTheme();

    }, [actionData])

    const handleThemeChange = (e: BaseSyntheticEvent) => {
        const theme = e.target.checked ? 'dark' : 'light';
        localStorage.setItem('data-theme', theme);
        document.getElementById('ak-wordle-root')?.setAttribute('data-theme', theme);
        setDarkMode(theme === 'dark');
    }

    return (
        <main id='ak-wordle-root' className='flex flex-col w-screen justify-top items-center align-middle text-center font-sans p-5 pt-10 h-screen'>
            <label className="z-10 swap swap-rotate fixed bottom-1 right-1 md:bottom-auto md:top-3 md:right-3 ">
                {/* this hidden checkbox controls the state */}
                <input id='theme-checkbox' type="checkbox" className="theme-controller hidden" value="dark" onClick={(e) => handleThemeChange(e)}/>
                {/* sun icon */}
                <svg className="swap-on fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>
                {/* moon icon */}
                <svg className="swap-off fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>
            </label>
            <img style={{height: '50'}} src={`${darkMode ? LogoWhite : LogoBlack}`}></img>
            <h1 className='font-bold text-4xl'>WORDLE</h1>
            <div className='mt-2'>
                <p>{`#${stats.gameId}, ${stats.date} (AEST)`}</p>
                <p>{`${stats.timesGuessed === 0 ? 'No Dokutah\'s have': stats.timesGuessed + ' ' + (stats.timesGuessed > 1 ? 'Dokutah\'s have' : 'Dokutah has')} guessed the operator.`}</p>
            </div>
            {false && // TODO: Remove. This is for testing purposes.
                <p>{`Operator Id: ${stats.operatorId}`}</p>
            }
            <div className='flex justify-center align-middle w-3/4 md:w-96 my-2'>
                <Hints amtGuesses={guesses.length}/>
            </div>
            {actionData?.error ? (
                <p className='text-red-500'>{actionData.error}</p>
            ) : null}

            {/** 
             * Using grid and col-start to force these elements to overlap one another 
             * This is so the search bar appears ontop of the answer row instead of pushing it down.
            */}
            <div className='grid w-full justify-center'>
                <div className='flex flex-col col-start-1 row-start-1 align-middle w-full animate-fade-in'>
                    {playing === 0 && !isInputDelay && <Search guesses={guesses} />}
                </div>

                <div className='col-start-1 row-start-1 flex flex-col my-14 w-auto overflow-x-scroll overflow-y-clip md:overflow-visible'>
                    {/** Wrapper for div to expand into scrollable area in mobile*/}
                    <div className='flex flex-col items-start'>
                        <div className='flex flex-row font-bold justify-center break-all'>
                            {guesses && (guesses.length) > 0 ?
                                Object.entries(guessCategoryToolTips).map((category, index) => (
                                    <span key={index} className='tooltip-answer-row flex h-20 w-20 m-2 items-center justify-center bg-base-200 text-content whitespace-pre-line' data-tip={category[1]}>{category[0]}</span>
                                )) : null
                            }
                        </div>
                        
                        {guesses && (guesses.length) > 0 &&
                            guesses.map((guess: GuessResult, index) => (<AnswerRow key={guess.charId ? guess.charId : index} guess={guess} index={index}/>))
                        }
                    </div>
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