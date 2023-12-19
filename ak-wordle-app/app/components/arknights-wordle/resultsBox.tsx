
import { GuessType } from '~/helper/helper';
import Result from './result';

type Props = {
    results: GuessType[];
    guesses: string[];
}

export default function ResultsBox({results, guesses} : Props) {
    return (
        <>
            {results.length > 0 &&
                <div className='z-50 flex flex-col max-h-40 overflow-y-scroll w-1/2 bg-white border-solid border-black border-2 border-t-2'>
                    {results.map((op, index) => {
                        if (guesses.includes(op[0])) {
                            return <Result key={index} op={op} hasGuessed={true} />
                        } else {
                            return <Result key={index} op={op} hasGuessed={false} />
                        }
                    })}
                </div>
            }
        </>
        
    );
}