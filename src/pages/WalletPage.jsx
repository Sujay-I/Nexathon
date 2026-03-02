import { useMemo, useState } from 'react'
import { walletTransactions } from '../data/mockData'
import { useToast } from '../context/ToastContext'

function shorten(value) {
  return `${value.slice(0, 10)}...${value.slice(-8)}`
}

export default function WalletPage() {
  const { notify } = useToast()
  const [statusFilter, setStatusFilter] = useState('All')
  const [typeFilter, setTypeFilter] = useState('All')

  const filtered = useMemo(
    () =>
      walletTransactions.filter((item) => {
        const statusPass = statusFilter === 'All' || item.status === statusFilter
        const typePass = typeFilter === 'All' || item.type === typeFilter
        return statusPass && typePass
      }),
    [statusFilter, typeFilter],
  )

  const connectWallet = () => {
    // TODO: Replace with backend API call - POST /api/wallet/connect
    const mockResponse = { success: true, address: 'ALGO9X8Y7Z6A5B4C3D2E1F0G9H8J7K6L5M4N3P2Q1R0S9T8U7' }
    notify(`Connected placeholder: ${mockResponse.address.slice(0, 12)}...`, 'info')
  }

  const exportCsv = () => {
    // TODO: Replace with backend API call - GET /api/wallet/transactions/export
    const mockResponse = { success: true, file: 'fundchain-wallet-history.csv' }
    notify(`CSV export placeholder: ${mockResponse.file}`, 'success')
  }

  return (
    <div className='space-y-5'>
      <h1 className='font-space text-3xl text-cyan-100'>Wallet & Transactions</h1>

      <section className='rounded-xl border border-cyan-500/30 bg-slate-900/60 p-5'>
        <div className='flex flex-wrap items-start justify-between gap-4'>
          <div>
            <p className='font-mono text-xs text-slate-400'>Connected Wallet (Placeholder)</p>
            <p className='mt-1 font-mono text-sm text-cyan-200'>ALGO4A3S2D1F0G9H8J7K6L5M4N3P2Q1R0S9T8U7Y6I5O4P3A2</p>
            <p className='mt-1 text-slate-300'>Balance: <span className='font-mono text-cyan-100'>14,280.55 ALGO</span></p>
          </div>
          <button onClick={connectWallet} className='rounded border border-cyan-400/70 bg-cyan-500/10 px-4 py-2 text-cyan-100'>Connect Wallet</button>
        </div>
      </section>

      <section className='rounded-xl border border-slate-700 bg-slate-900/60 p-4'>
        <div className='mb-4 flex flex-wrap items-center justify-between gap-2'>
          <h2 className='font-space text-xl text-cyan-100'>Transaction History</h2>
          <div className='flex gap-2'>
            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className='rounded border border-slate-700 bg-slate-950 px-2 py-1 text-sm'>
              {['All', 'Confirmed', 'Pending'].map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
            <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)} className='rounded border border-slate-700 bg-slate-950 px-2 py-1 text-sm'>
              {['All', 'Inbound', 'Outbound'].map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
            <button onClick={exportCsv} className='rounded border border-teal-400/70 px-3 py-1 text-sm text-teal-100'>
              Export CSV
            </button>
          </div>
        </div>
        <div className='overflow-x-auto'>
          <table className='w-full text-left text-sm'>
            <thead className='text-xs uppercase text-slate-400'>
              <tr>
                <th className='px-2 py-2'>Tx Hash</th>
                <th className='px-2 py-2'>Type</th>
                <th className='px-2 py-2'>Amount</th>
                <th className='px-2 py-2'>Date</th>
                <th className='px-2 py-2'>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((transaction) => (
                <tr key={transaction.id} className='border-t border-slate-800'>
                  <td className='px-2 py-2 font-mono text-cyan-200'>{shorten(transaction.txHash)}</td>
                  <td className='px-2 py-2'>{transaction.type}</td>
                  <td className='px-2 py-2 font-mono'>{transaction.amount} ALGO</td>
                  <td className='px-2 py-2'>{transaction.date}</td>
                  <td className='px-2 py-2'>{transaction.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
