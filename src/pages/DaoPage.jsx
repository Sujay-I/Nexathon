import { useMemo, useState } from 'react'
import Modal from '../components/Modal'
import StatusBadge from '../components/StatusBadge'
import { daoProposals } from '../data/mockData'
import { useToast } from '../context/ToastContext'

export default function DaoPage() {
  const { notify } = useToast()
  const [selected, setSelected] = useState(null)
  const [showPast, setShowPast] = useState(false)

  const activeProposals = useMemo(() => daoProposals.filter((proposal) => proposal.status === 'Active'), [])
  const pastProposals = useMemo(() => daoProposals.filter((proposal) => proposal.status !== 'Active'), [])

  const castVote = (proposalId) => {
    // TODO: Replace with backend API call - POST /api/dao/vote
    const mockResponse = { success: true, proposalId }
    notify(`Vote submitted for ${mockResponse.proposalId}`, 'success')
  }

  return (
    <div className='space-y-5'>
      <h1 className='font-space text-3xl text-cyan-100'>DAO Voting Interface</h1>

      <section className='space-y-3'>
        {activeProposals.map((proposal) => {
          const total = proposal.yes + proposal.no + proposal.abstain
          const yesPercent = Math.round((proposal.yes / total) * 100)
          const noPercent = Math.round((proposal.no / total) * 100)

          return (
            <article key={proposal.id} className='rounded-xl border border-cyan-500/30 bg-slate-900/60 p-4'>
              <div className='mb-2 flex flex-wrap items-center justify-between gap-2'>
                <div>
                  <h2 className='font-space text-lg text-cyan-100'>{proposal.title}</h2>
                  <p className='text-sm text-slate-300'>{proposal.description}</p>
                </div>
                <StatusBadge status={proposal.status} />
              </div>

              <div className='mb-2 flex items-center justify-between text-xs text-slate-400'>
                <span>Deadline: {proposal.deadline}</span>
                <span className='font-mono'>Yes {proposal.yes} | No {proposal.no} | Abstain {proposal.abstain}</span>
              </div>

              <div className='h-2 rounded-full bg-slate-800'>
                <div className='h-2 rounded-full bg-cyan-400' style={{ width: `${yesPercent}%` }} />
              </div>
              <div className='mt-1 h-2 rounded-full bg-slate-800'>
                <div className='h-2 rounded-full bg-rose-400' style={{ width: `${noPercent}%` }} />
              </div>

              <div className='mt-3 flex gap-2'>
                <button onClick={() => castVote(proposal.id)} className='rounded border border-cyan-400/70 px-3 py-2 text-sm text-cyan-100'>Cast Vote</button>
                <button onClick={() => setSelected(proposal)} className='rounded border border-slate-700 px-3 py-2 text-sm text-slate-200'>View Details</button>
              </div>
            </article>
          )
        })}
      </section>

      <section className='rounded-xl border border-slate-700 bg-slate-900/60 p-4'>
        <button onClick={() => setShowPast((value) => !value)} className='font-space text-lg text-cyan-100'>
          Past Proposals {showPast ? '[-]' : '[+]'}
        </button>
        {showPast && (
          <div className='mt-3 space-y-2'>
            {pastProposals.map((proposal) => (
              <div key={proposal.id} className='rounded border border-slate-800 bg-slate-950/60 p-3'>
                <div className='flex items-center justify-between'>
                  <p className='text-sm text-slate-200'>{proposal.title}</p>
                  <StatusBadge status={proposal.status} />
                </div>
                <p className='text-xs text-slate-400'>Deadline: {proposal.deadline}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      <Modal
        open={Boolean(selected)}
        title={selected ? selected.title : 'Proposal'}
        onClose={() => setSelected(null)}
        footer={
          <button onClick={() => setSelected(null)} className='rounded border border-cyan-400/60 px-3 py-2 text-sm text-cyan-200'>
            Close
          </button>
        }
      >
        {selected && (
          <div className='space-y-2 text-sm text-slate-300'>
            <p>{selected.description}</p>
            <p className='font-mono text-xs text-slate-400'>Yes: {selected.yes} | No: {selected.no} | Abstain: {selected.abstain}</p>
            <p className='font-mono text-xs text-slate-400'>Deadline: {selected.deadline}</p>
            <StatusBadge status={selected.status} />
          </div>
        )}
      </Modal>
    </div>
  )
}
