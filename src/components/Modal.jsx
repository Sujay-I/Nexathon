export default function Modal({ open, title, onClose, children, footer }) {
  if (!open) return null

  return (
    <div className='fixed inset-0 z-[90] flex items-center justify-center bg-black/70 px-4'>
      <div className='w-full max-w-2xl rounded-2xl border border-cyan-500/40 bg-slate-950/95 p-6 shadow-neon backdrop-blur'>
        <div className='mb-4 flex items-start justify-between gap-3'>
          <h3 className='font-space text-xl text-cyan-100'>{title}</h3>
          <button onClick={onClose} className='rounded border border-slate-700 px-2 py-1 text-xs text-slate-300 hover:border-cyan-300 hover:text-cyan-200'>
            Close
          </button>
        </div>
        <div>{children}</div>
        {footer ? <div className='mt-6'>{footer}</div> : null}
      </div>
    </div>
  )
}
