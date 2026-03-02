import StatusBadge from './StatusBadge'

export default function MilestoneStepper({ milestones }) {
  return (
    <div className='space-y-4'>
      {milestones.map((milestone, index) => (
        <div key={milestone.id} className='relative pl-8'>
          {index < milestones.length - 1 ? <span className='absolute left-[11px] top-6 h-full w-px bg-cyan-600/40' /> : null}
          <span className='absolute left-0 top-1 inline-block h-6 w-6 rounded-full border border-cyan-400/60 bg-slate-950' />
          <div className='rounded-xl border border-slate-700/80 bg-slate-900/60 p-4'>
            <div className='mb-2 flex items-center justify-between gap-3'>
              <h4 className='font-space text-sm text-cyan-100'>{milestone.name}</h4>
              <StatusBadge status={milestone.status} />
            </div>
            <p className='text-sm text-slate-300'>{milestone.description}</p>
            <div className='mt-2 flex flex-wrap gap-3 font-mono text-xs text-slate-400'>
              <span>{milestone.amount.toLocaleString()} ALGO</span>
              <span>{milestone.date}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
