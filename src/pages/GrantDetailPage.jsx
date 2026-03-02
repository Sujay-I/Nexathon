import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import MilestoneStepper from '../components/MilestoneStepper'
import StatusBadge from '../components/StatusBadge'
import { grants, transactionHistoryByGrant } from '../data/mockData'
import { useToast } from '../context/ToastContext'

function shortHash(value) {
  return `${value.slice(0, 10)}...${value.slice(-8)}`
}

export default function GrantDetailPage() {
  const { id } = useParams()
  const { notify } = useToast()
  const [processing, setProcessing] = useState(false)

  const grant = useMemo(() => grants.find((item) => item.id === id), [id])
  const transactions = transactionHistoryByGrant[id] || []

  if (!grant) {
    return <p className='rounded-xl border border-rose-400/40 bg-rose-500/10 p-4 text-rose-200'>Grant not found.</p>
  }

  const chartData = grant.milestones.map((milestone) => ({
    milestone: milestone.name,
    allocated: milestone.amount,
    spent: milestone.spent,
  }))

  const approveMilestone = async () => {
    setProcessing(true)
    try {
      // TODO: backend approval API
      // TODO: Replace with backend API call - POST /api/grants/milestones/approve
      const mockResponse = { success: true, message: 'Milestone approved by DAO quorum.' }
      notify(mockResponse.message, 'success')
    } finally {
      setProcessing(false)
    }
  }

  const submitProof = async () => {
    setProcessing(true)
    try {
      // TODO: Replace with backend API call - POST /api/grants/milestones/proof
      const mockResponse = { success: true, proofId: 'proof-7782' }
      notify(`Proof submitted: ${mockResponse.proofId}`, 'info')
    } finally {
      setProcessing(false)
    }
  }

  return (
    <div className='grid gap-6 lg:grid-cols-[1fr_320px]'>
      <div className='space-y-6'>
        <section className='rounded-2xl border border-cyan-500/30 bg-slate-900/60 p-5'>
          <div className='flex flex-wrap items-start justify-between gap-4'>
            <div>
              <h1 className='font-space text-3xl text-cyan-100'>{grant.projectName}</h1>
              <p className='mt-1 text-sm text-slate-400'>Sponsor: {grant.sponsor}</p>
            </div>
            <div className='text-right'>
              <StatusBadge status={grant.status} />
              <p className='mt-2 font-mono text-sm text-cyan-200'>{grant.totalAmount.toLocaleString()} ALGO</p>
            </div>
          </div>
        </section>

        <section className='rounded-2xl border border-slate-700 bg-slate-900/60 p-5'>
          <h2 className='mb-4 font-space text-xl text-cyan-100'>Milestone Timeline</h2>
          <MilestoneStepper milestones={grant.milestones} />
        </section>

        <section className='rounded-2xl border border-slate-700 bg-slate-900/60 p-5'>
          <h2 className='mb-4 font-space text-xl text-cyan-100'>Fund Flow Chart</h2>
          <div className='h-72'>
            <ResponsiveContainer width='100%' height='100%'>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray='3 3' stroke='#334155' />
                <XAxis dataKey='milestone' stroke='#94a3b8' />
                <YAxis stroke='#94a3b8' />
                <Tooltip contentStyle={{ background: '#020617', border: '1px solid #0891b2' }} />
                <Legend />
                <Bar dataKey='allocated' fill='#06b6d4' />
                <Bar dataKey='spent' fill='#14b8a6' />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className='rounded-2xl border border-slate-700 bg-slate-900/60 p-5'>
          <div className='mb-4 flex flex-wrap items-center justify-between gap-3'>
            <h2 className='font-space text-xl text-cyan-100'>Transaction History</h2>
            <div className='flex gap-2'>
              <button onClick={approveMilestone} disabled={processing} className='rounded-lg border border-teal-400/60 bg-teal-500/10 px-3 py-2 text-sm text-teal-200 hover:shadow-neon-sm disabled:opacity-60'>
                Approve Milestone
              </button>
              <button onClick={submitProof} disabled={processing} className='rounded-lg border border-cyan-400/60 bg-cyan-500/10 px-3 py-2 text-sm text-cyan-200 hover:shadow-neon-sm disabled:opacity-60'>
                Submit Proof of Completion
              </button>
            </div>
          </div>
          <div className='overflow-x-auto'>
            <table className='w-full text-left text-sm'>
              <thead className='text-xs uppercase text-slate-400'>
                <tr>
                  <th className='px-2 py-2'>Tx Hash</th>
                  <th className='px-2 py-2'>Date</th>
                  <th className='px-2 py-2'>Amount</th>
                  <th className='px-2 py-2'>Milestone</th>
                  <th className='px-2 py-2'>Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.txHash} className='border-t border-slate-800'>
                    <td className='px-2 py-2 font-mono text-cyan-200'>{shortHash(transaction.txHash)}</td>
                    <td className='px-2 py-2'>{transaction.date}</td>
                    <td className='px-2 py-2 font-mono'>{transaction.amount.toLocaleString()} ALGO</td>
                    <td className='px-2 py-2'>{transaction.milestone}</td>
                    <td className='px-2 py-2'><StatusBadge status={transaction.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      <aside className='space-y-4'>
        <div className='rounded-2xl border border-cyan-500/30 bg-slate-900/70 p-4'>
          <h3 className='font-space text-lg text-cyan-100'>Sponsor Information</h3>
          <p className='mt-2 text-sm text-slate-300'>{grant.sponsor}</p>
          <p className='font-mono text-xs text-slate-400'>Wallet: {grant.teamWallet}</p>
        </div>
        <div className='rounded-2xl border border-slate-700 bg-slate-900/70 p-4'>
          <h3 className='font-space text-lg text-cyan-100'>Grant Metadata</h3>
          <ul className='mt-2 space-y-2 text-sm text-slate-300'>
            <li>Category: {grant.category}</li>
            <li>Created: {grant.createdAt}</li>
            <li>Deadline: {grant.deadline}</li>
          </ul>
        </div>
        <div className='rounded-2xl border border-slate-700 bg-slate-900/70 p-4'>
          <h3 className='font-space text-lg text-cyan-100'>Algorand Contract</h3>
          <p className='mt-2 break-all font-mono text-xs text-cyan-200'>{grant.contractAddress}</p>
        </div>
      </aside>
    </div>
  )
}
