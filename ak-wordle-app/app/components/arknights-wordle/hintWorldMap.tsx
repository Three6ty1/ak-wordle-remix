import map from '../../../public/world_map.png'

export default function HintWorldMap() {
    return (
        <div>
            {/* @ts-ignore */}
            <button className="btn" onClick={()=>document.getElementById('world_map_modal').showModal()}>Open World Map</button>
            <dialog id="world_map_modal" className="modal">
                <div className="modal-box max-w-[70vw]">
                    <img src={map}></img>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    )
}