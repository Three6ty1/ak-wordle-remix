import { getOperatorIconUrl } from "~/helper/helper";

type Props = {
    operator: [string, string, number];
}

export default function ListIcon({ operator, } : Props) {
    const url = getOperatorIconUrl(operator[1], operator[2])
    return (
        <div className='tooltip' data-tip={operator[0]}>
            <img className='border-correct border-[0.1px] border-solid m-[0.5px] rounded-md' src={url} alt={`${operator[0]} operator icon`} width={50} height={50} />
        </div>
    )
}