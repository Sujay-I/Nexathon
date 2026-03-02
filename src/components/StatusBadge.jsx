const statusColors = {
  Pending: 'border-yellow-400/60 bg-yellow-500/10 text-yellow-200',
  Active: 'border-cyan-400/60 bg-cyan-500/10 text-cyan-200',
  Completed: 'border-emerald-400/60 bg-emerald-500/10 text-emerald-200',
  Approved: 'border-teal-400/60 bg-teal-500/10 text-teal-100',
  Released: 'border-green-400/60 bg-green-500/10 text-green-100',
  Rejected: 'border-rose-400/60 bg-rose-500/10 text-rose-100',
}

export default function StatusBadge({ status }) {
  return <span className={`rounded-full border px-2.5 py-1 font-mono text-xs ${statusColors[status] || statusColors.Pending}`}>{status}</span>
}
