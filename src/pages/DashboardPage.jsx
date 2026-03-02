import StatusBadge from '../components/StatusBadge'
import { dashboardSummary, grants, recentTransactions, upcomingMilestones } from '../data/mockData'
import { useToast } from '../context/ToastContext'

function shortHash(value) {
  return `${value.slice(0, 10)}...${value.slice(-8)}`
}

export default function DashboardPage() {
  const { notify } = useToast()

  const triggerAction = (label) => {
    // TODO: Replace with backend API call - POST /api/dashboard/action
    const mockResponse = { success: true, action: label }
    notify(`Action queued: ${mockResponse.action}`, 'info')
  }

  return (
    <div className='space-y-5'>
      <h1 className='font-space text-3xl text-cyan-100'>Project Team Dashboard</h1>

      <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-4'>
        <div className='rounded-xl border border-slate-700 bg-slate-900/60 p-4'>
          <p className='font-mono text-xs text-slate-400'>Total Received</p>
          <p className='font-space text-2xl text-cyan-100'>{dashboardSummary.totalReceived.toLocaleString()} ALGO</p>
        </div>
        <div className='rounded-xl border border-slate-700 bg-slate-900/60 p-4'>
          <p className='font-mono text-xs text-slate-400'>Pending Release</p>
          <p className='font-space text-2xl text-cyan-100'>{dashboardSummary.pendingRelease.toLocaleString()} ALGO</p>
        </div>
        <div className='rounded-xl border border-slate-700 bg-slate-900/60 p-4'>
          <p className='font-mono text-xs text-slate-400'>Next Milestone Due</p>
          <p className='font-space text-2xl text-cyan-100'>{dashboardSummary.nextMilestoneDue}</p>
        </div>
        <div className='rounded-xl border border-slate-700 bg-slate-900/60 p-4'>
          <p className='font-mono text-xs text-slate-400'>Completion %</p>
          <p className='font-space text-2xl text-cyan-100'>{dashboardSummary.completionPercent}%</p>
        </div>
      </div>

      <div className='grid gap-4 lg:grid-cols-2'>
        <section className='rounded-xl border border-slate-700 bg-slate-900/60 p-4'>
          <h2 className='mb-4 font-space text-xl text-cyan-100'>Active Grants</h2>
          <div className='space-y-3'>
            {grants.filter((grant) => grant.status === 'Active').map((grant) => (
              <div key={grant.id} className='rounded border border-slate-800 bg-slate-950/60 p-3'>
                <div className='mb-2 flex justify-between'>
                  <p className='text-sm text-slate-200'>{grant.projectName}</p>
                  <StatusBadge status={grant.status} />
                </div>
                <div className='h-2 rounded-full bg-slate-800'>
                  <div className='h-2 rounded-full bg-cyan-400' style={{ width: `${grant.completion}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className='rounded-xl border border-slate-700 bg-slate-900/60 p-4'>
          <h2 className='mb-4 font-space text-xl text-cyan-100'>Upcoming Milestones</h2>
          <div className='space-y-3'>
            {upcomingMilestones.map((milestone) => (
              <div key={milestone.id} className='rounded border border-slate-800 bg-slate-950/60 p-3'>
                <p className='text-sm text-slate-200'>{milestone.name}</p>
                <p className='text-xs text-slate-400'>{milestone.grant}</p>
                <p className='font-mono text-xs text-cyan-200'>Due {milestone.dueDate} - {milestone.amount.toLocaleString()} ALGO</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className='rounded-xl border border-slate-700 bg-slate-900/60 p-4'>
        <h2 className='mb-4 font-space text-xl text-cyan-100'>Recent Transactions</h2>
        <div className='space-y-2'>
          {recentTransactions.map((transaction) => (
            <div key={transaction.id} className='flex flex-wrap items-center justify-between gap-2 rounded border border-slate-800 bg-slate-950/60 px-3 py-2 text-sm'>
              <span className='font-mono text-cyan-200'>{shortHash(transaction.hash)}</span>
              <span>{transaction.grant}</span>
              <span>{transaction.amount.toLocaleString()} ALGO</span>
              <span>{transaction.date}</span>
              <StatusBadge status={transaction.status} />
            </div>
          ))}
        </div>
      </section>

      <section className='rounded-xl border border-slate-700 bg-slate-900/60 p-4'>
        <h2 className='mb-3 font-space text-xl text-cyan-100'>Quick Actions</h2>
        <div className='flex flex-wrap gap-3'>
          <button onClick={() => triggerAction('Submit Milestone Proof')} className='rounded border border-cyan-400/70 px-3 py-2 text-sm text-cyan-100'>Submit Milestone Proof</button>
          <button onClick={() => triggerAction('Request Fund Release')} className='rounded border border-teal-400/70 px-3 py-2 text-sm text-teal-100'>Request Fund Release</button>
        </div>
      </section>
    </div>
  )
}
