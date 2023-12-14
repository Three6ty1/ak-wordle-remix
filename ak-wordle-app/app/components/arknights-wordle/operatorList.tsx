import { useLoaderData } from "@remix-run/react";
import ListIcon from "./listIcon";

export default function OperatorList() {
    const loaderData: any = useLoaderData();
    const allOperators: [string, string, number][] = loaderData.allOperators;

    return (
        <>
        {/* Open the modal using document.getElementById('ID').showModal() method */}
            <button className='btn' onClick={()=> {
                    /* @ts-ignore */
                    return (document.getElementById('my_modal_2').showModal())}
                }>Open Operator List</button>

            <dialog id='my_modal_2' className='modal'>
                <div className='modal-box max-w-[3/5vh] justify-items-center'>
                    <h1>Operator List</h1>
                    <div className='flex flex-row flex-wrap'>
                        {allOperators.map((operator) => {
                            return (<ListIcon key={`${operator} list icon`}operator={operator} />)
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