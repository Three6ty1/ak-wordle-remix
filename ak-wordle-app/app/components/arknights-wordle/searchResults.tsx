
import SearchResult from './searchResult';

type Props = {
    results: string[];
    guesses: string[];
}

export default function SearchResults({results, guesses} : Props) {
    return (
        <div className='flex flex-col max-h-40 overflow-y-scroll'>
            {results.map((op, index) => {
                if (guesses.includes(op)) {
                    return <SearchResult key={index} op={op} hasGuessed={true}/>
                } else {
                    return <SearchResult key={index} op={op} hasGuessed={false}/>
                }
            })}
        </div>
    );
}