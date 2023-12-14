import { useLoaderData } from "@remix-run/react";
import HintListIcon from "./hintListIcon";

export default function HintOperatorList() {
    const loaderData: any = useLoaderData();
    const allOperators: [string, string, number][] = loaderData.allOperators;

    // guesses is a state that gets updated, so hopefully increases in guesses will proc the amt guesses to update the available resources...

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
                        {allOperators.map((operator) => {
                            return (<HintListIcon key={`${operator} list icon`}operator={operator} />)
                        })
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