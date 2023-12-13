export default function Index() {
  return (
    <div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      {/* @ts-ignore */}
      <button className="btn" onClick={()=>document.getElementById('my_modal_2').showModal()}>open modal</button>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">Press ESC key or click outside to close</p>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
      <h1 className="text-blue">Hello, World!</h1>
    </div>
  )
}
