
import Result from './result';

type Props = {
    results: [];
    guesses: string[];
}

export default function ResultsBox({results, guesses} : Props) {
    return (
        <div className='flex flex-col max-h-40 overflow-y-scroll'>
            {results.map((op, index) => {
                if (guesses.includes(op)) {
                    return <Result key={index} op={op} hasGuessed={true}/>
                } else {
                    return <Result key={index} op={op} hasGuessed={false}/>
                }
            })}
        </div>
    );
}