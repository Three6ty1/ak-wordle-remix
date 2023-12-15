import map from '../../../public/world_map.png'
import { HintBreakpoints } from './hints'

const regions = {
    'Ægir': 'Aquatic animals and Seaborn.\nGroups: Abyssal Hunters.',
    'Bolivar': 'Mainly Perros: Dogs.',
    'Columbia': 'Varied.\nGroups: Blacksteel, Rhine Lab.',
    'Higashi': 'Oni and some Ægir.',
    'Iberia': 'Mainly Liberi: Birds.',
    'Kazimierz': 'Mainly Kuranta: Horses and Zebras.\nGroups: Pinus Sylvestris.',
    'Kjerag': 'Varied. Snow Realm.',
    'Laterano': 'Mainly Sankta: Angels and Liberi: Birds.',
    'Leithanien': 'Mainly Caprinae: Goats/Sheep and Elafia: Deer.',
    'Lungmen': 'Varied.\nGroups: Lee\'s Detective Agency, LGD, Penguin Logistics.',
    'Minos': 'Mainly Forte: Bovines/Camels.',
    'Rhodes Island': 'Varied.\nGroups: Elite Ops, Followers, Op-teams, S.W.E.E.P.',
    'Rim Billiton': 'Mainly Cautus: Rabbits and Hares.',
    'Sami': 'Mainly Elafia: Deer',
    'Sargon': 'Mainly Archosauria: Crocodilians and Pythia: Serpents.',
    'Siracusa': 'Mainly Lupo: Wolves and Vulpo: Foxes.\nGroups: Chiave\'s Gang.',
    'Ursus': 'Mainly Ursus: Bears.\nGroups: Students of Ursus.',
    'Victoria': 'Mainly Feline: Cats.\nGroups: Dublinn, Glasgow.',
    'Yan': 'Varied. Ruled by Lung.\nGroups: Sui.',
}

type Props = {
    amtGuesses: number,
}


export default function HintWorldMap({amtGuesses, }: Props) {
    return (
        <div>
            {/* @ts-ignore */}
            <button className="btn" onClick={()=>document.getElementById('world_map_modal').showModal()}>Open World Map</button>
            <dialog id="world_map_modal" className="modal">
                <div className="modal-box max-w-[70vw]">
                    <img src={map} />
                    {amtGuesses >= HintBreakpoints.one &&
                    <div className='flex flex-wrap flex-row justify-start'>
                        {Object.entries(regions).map((region) => (
                            <div className='text-left w-1/2 h-20'>
                                <h1 className='font-bold'>{region[0]}</h1>
                                <p className='whitespace-pre-line'>{region[1]}</p>
                            </div>
                        ))}
                    </div>
                    }
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    )
}