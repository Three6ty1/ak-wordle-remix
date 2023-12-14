import { useLoaderData } from "@remix-run/react";
import HintListIcon from "./hintListIcon";
import React from "react";
import { GuessType, GuessTypeValue } from "~/helper/helper";
import { HintBreakpoints } from "./hints";

type Props = {
    amtGuesses: number,
}

interface Dictionary<T> {
    [Key: string]: T;
}

export default function HintOperatorList({ amtGuesses, }: Props) {
    const loaderData: any = useLoaderData();
    const allOperators: GuessType[] = loaderData.allOperators;

    const sortedRarityOperators: Dictionary<GuessType[]> = {
        "6": [],
        "5": [],
        "4": [],
        "3": [],
        "2": [],
        "1": [],
    };

    allOperators.map((operator) => sortedRarityOperators[operator[GuessTypeValue.rarity] as keyof typeof sortedRarityOperators].push(operator))

    return (
        <>
        {/* Open the modal using document.getElementById('ID').showModal() method */}
            <button className='btn' onClick={()=> {
                    /* @ts-ignore */
                    return (document.getElementById('operator_list_modal').showModal())}
                }>Open Operator List</button>

            <dialog id='operator_list_modal' className='modal'>
                <div className='modal-box max-w-[3/5vh] justify-items-center'>
                    <h1>Operator List</h1>
                    <div className='flex flex-row flex-wrap'>
                        {/*amtGuesses > HintBreakpoints.one ? */
                        false ?
                                <div>
                                    {allOperators.map((operator) => {
                                        return (<HintListIcon key={`${operator} list icon`} operator={operator} />)
                                    })}
                                </div>
                            :
                                <div>
                                    {Object.entries(sortedRarityOperators).reverse().map((rarity) => {
                                        return (
                                            <div>
                                                <h2>{rarity[0]} star Operators</h2>
                                                {rarity[1].map((operator) => (
                                                    <HintListIcon key={`${operator} list icon`} operator={operator} />
                                                ))}
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