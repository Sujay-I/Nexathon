import { useMemo, useState, useEffect } from 'react'
import { walletTransactions } from '../data/mockData'
import { useToast } from '../context/ToastContext'
import { useWallet } from '@txnlab/use-wallet-react'
import algosdk from 'algosdk'
import { getAlgodConfigFromViteEnvironment } from '../utils/network/getAlgoClientConfigs'
import ConnectWallet from '../components/ConnectWallet'

function shorten(value) {
  if (!value) return ''
  return `${value.slice(0, 10)}...${value.slice(-8)}`
}

export default function WalletPage() {
  const { notify } = useToast()
  const { activeAddress } = useWallet()
  const [balance, setBalance] = useState(0)
  const [statusFilter, setStatusFilter] = useState('All')
  const [typeFilter, setTypeFilter] = useState('All')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const toggleModal = () => setIsModalOpen(!isModalOpen)

  useEffect(() => {
    const fetchBalance = async () => {
      if (activeAddress) {
        try {
          const config = getAlgodConfigFromViteEnvironment()
          const algodClient = new algosdk.Algodv2(config.token, config.server, config.port)
          const accountInfo = await algodClient.accountInformation(activeAddress).do()
          setBalance(accountInfo.amount / 1_000_000) // Convert microAlgos to Algos
        } catch (error) {
          console.error('Error fetching balance:', error)
          notify('Failed to fetch account balance', 'error')
        }
      }
    }

    fetchBalance()
  }, [activeAddress, notify])

  const filtered = useMemo(
    () =>
      walletTransactions.filter((item) => {
        const statusPass = statusFilter === 'All' || item.status === statusFilter
        const typePass = typeFilter === 'All' || item.type === typeFilter
        return statusPass && typePass
      }),
    [statusFilter, typeFilter],
  )

  const handleConnect = () => {
    if (activeAddress) {
      notify(`Wallet already connected: ${activeAddress.slice(0, 10)}...`, 'info')
    } else {
      toggleModal()
    }
  }

  const exportCsv = () => {
    if (filtered.length === 0) {
      notify('No transactions to export', 'info')
      return
    }

    const headers = ['ID', 'Transaction Hash', 'Type', 'Amount (ALGO)', 'Date', 'Status']
    const rows = filtered.map((tx) => [tx.id, tx.txHash, tx.type, tx.amount, tx.date, tx.status])

    const csvContent = [headers, ...rows].map((row) => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.setAttribute('href', url)
    link.setAttribute('download', `vitta-transactions-${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    notify('CSV export triggered successfully', 'success')
  }

  return (
    <div className='space-y-5'>
      <h1 className='font-space text-3xl text-cyan-100'>Wallet & Transactions</h1>

      <section className='rounded-xl border border-cyan-500/30 bg-slate-900/60 p-5'>
        <div className='flex flex-wrap items-start justify-between gap-4'>
          <div>
            <p className='font-mono text-xs text-slate-400'>Connected Wallet</p>
            <p className='mt-1 font-mono text-sm text-cyan-200'>
              {activeAddress || 'No wallet connected'}
            </p>
            <p className='mt-1 text-slate-300'>
              Balance: <span className='font-mono text-cyan-100'>{activeAddress ? `${balance.toLocaleString()} ALGO` : '---'}</span>
            </p>
          </div>
          <button
            onClick={handleConnect}
            className='rounded border border-cyan-400/70 bg-cyan-500/10 px-4 py-2 text-cyan-100 hover:shadow-neon transition'
          >
            {activeAddress ? 'Switch Wallet' : 'Connect Wallet'}
          </button>
        </div>
      </section>

      <ConnectWallet openModal={isModalOpen} closeModal={toggleModal} />

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
