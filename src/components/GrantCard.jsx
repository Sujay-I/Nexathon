import { Link } from 'react-router-dom'
import StatusBadge from './StatusBadge'

export default function GrantCard({ grant }) {
  return (
    <article className='group rounded-2xl border border-cyan-500/30 bg-slate-900/70 p-5 backdrop-blur transition hover:border-cyan-300 hover:shadow-neon-sm'>
      <div className='mb-3 flex items-start justify-between gap-4'>
        <div>
          <h3 className='font-space text-lg text-cyan-100'>{grant.projectName}</h3>
          <p className='font-mono text-xs text-slate-400'>Sponsor: {grant.sponsor}</p>
        </div>
        <StatusBadge status={grant.status} />
      </div>

      <div className='space-y-2 text-sm text-slate-300'>
        <p>Category: <span className='font-mono text-cyan-200'>{grant.category}</span></p>
        <p>Total Amount: <span className='font-mono text-cyan-200'>{grant.totalAmount.toLocaleString()} ALGO</span></p>
      </div>

      <div className='mt-4'>
        <div className='mb-1 flex items-center justify-between text-xs font-mono text-slate-400'>
          <span>Milestone Progress</span>
          <span>{grant.completion}%</span>
        </div>
        <div className='h-2 rounded-full bg-slate-800'>
          <div className='h-2 rounded-full bg-cyan-400 transition-all duration-700' style={{ width: `${grant.completion}%` }} />
        </div>
      </div>

      <Link to={`/grants/${grant.id}`} className='mt-4 inline-flex rounded-md border border-cyan-400/70 px-3 py-2 text-sm text-cyan-200 transition hover:bg-cyan-500/10'>
        View Details
      </Link>
    </article>
  )
}
