import { useLoaderData } from "@remix-run/react";
import HintListIcon from "./hintListIcon";
import React from "react";
import { GuessType, GuessTypeValue, getProfessionIconUrl, wordleColors } from "~/helper/helper";
import { HintBreakpoints } from "./hints";

type Props = {
    amtGuesses: number,
}

interface Dictionary<T> {
    [Key: string]: T;
}

const Professsions = ['Vanguard', 'Guard', 'Defender', 'Sniper', 'Caster', 'Medic', 'Supporter', 'Specialist'];

export default function HintOperatorList({ amtGuesses, }: Props) {
    const loaderData: any = useLoaderData();
    const allOperators: GuessType[] = loaderData.allOperators;

    const [selectedProfession, setSelectedProfession] = React.useState<string>('');

    const sortedRarityOperators: Dictionary<GuessType[]> = {
        "6": [],
        "5": [],
        "4": [],
        "3": [],
        "2": [],
        "1": [],
    };

    allOperators.map((operator) => sortedRarityOperators[operator[GuessTypeValue.rarity] as keyof typeof sortedRarityOperators].push(operator))

    const handleProfession = (e: React.SyntheticEvent<EventTarget>) => {
        // @ts-ignore
        setSelectedProfession(e.target.id)
    }

    return (
        <>
            {/* @ts-ignore */}
            <button className='btn' onClick={()=> {return (document.getElementById('operator_list_modal').showModal())}}>
                Open Operator List
            </button>
            <dialog id='operator_list_modal' className='modal'>
                <div className='modal-box max-w-[3/5vh] justify-items-center'>
                    <h1>Operator List</h1>
                    <div className='flex flex-row flex-wrap'>
                        {amtGuesses > HintBreakpoints.one ?
                                <div>
                                    {allOperators.map((operator) => {
                                        return (<HintListIcon key={`${operator} list icon`} operator={operator} />)
                                    })}
                                </div>
                            :
                                <div>
                                    <div>
                                        {amtGuesses > HintBreakpoints.two && Professsions.map((p) => (
                                            <button className='tooltip p-[0.2rem]' data-tip={p} key={`${p} icon`} onClick={handleProfession} style={{backgroundColor: selectedProfession === p ? wordleColors.higher : 'white'}}>
                                                <img src={getProfessionIconUrl(p)} width={40} id={p}/>
                                            </button>
                                        ))}
                                    </div>
                                    {Object.entries(sortedRarityOperators).reverse().map((rarity) => {
                                        return (
                                            <div>
                                                <h2>{rarity[0]} star Operators</h2>
                                                {rarity[1].map((operator) => {
                                                    if (amtGuesses > HintBreakpoints.two) {
                                                        if (operator[2] === selectedProfession) {
                                                                return <HintListIcon key={`${operator} list icon`} operator={operator} />
                                                        } 
                                                        return <></>
                                                    }
                                                    return <HintListIcon key={`${operator} list icon`} operator={operator} />
                                                })}
                                            </div>
                                        )
                                    })}
                                </div>
                        }
                    </div>
                </div>
                <form method='dialog' className='modal-backdrop'>
                    <button>close</button>
                </form>
            </dialog>
        </>
    )
}