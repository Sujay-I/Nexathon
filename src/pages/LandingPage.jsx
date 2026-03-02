import { Link } from 'react-router-dom'
import { Eye, Goal, ShieldCheck } from 'lucide-react'
import { landingStats } from '../data/mockData'
import { useToast } from '../context/ToastContext'
import { useWallet } from '@txnlab/use-wallet-react'
import { useState } from 'react'
import ConnectWallet from '../components/ConnectWallet'

const features = [
  {
    title: 'Transparent Tracking',
    description: 'Every disbursement and milestone approval is audit-ready and publicly verifiable.',
    icon: Eye,
  },
  {
    title: 'Milestone-Based Releases',
    description: 'Funds unlock only after proof checks and governance approvals are completed.',
    icon: Goal,
  },
  {
    title: 'DAO Governance',
    description: 'Grant stakeholders vote on critical release decisions with immutable records.',
    icon: ShieldCheck,
  },
]

const flow = ['Create Grant', 'Set Milestones', 'Approve & Release']

export default function LandingPage() {
  const { notify } = useToast()
  const { activeAddress } = useWallet()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const toggleModal = () => setIsModalOpen(!isModalOpen)

  const handleConnect = () => {
    if (activeAddress) {
      notify(`Wallet already connected: ${activeAddress.slice(0, 10)}...`, 'info')
    } else {
      toggleModal()
    }
  }

  return (
    <div className='space-y-14 pb-8'>
      <section className='relative overflow-hidden rounded-3xl border border-cyan-500/30 bg-slate-900/60 p-8 lg:p-12'>
        <div className='grid gap-8 lg:grid-cols-2'>
          <div className='space-y-5'>
            <p className='font-mono text-xs uppercase tracking-[0.2em] text-cyan-300'>Blockchain-Based Transparent Grant System</p>
            <h1 className='font-space text-4xl font-bold leading-tight text-white lg:text-5xl'>
              Vitta
            </h1>
            <p className='max-w-xl text-slate-300'>
              A production-ready grant and fund tracking interface for Algorand. Track every milestone, approval, and release with governance-native transparency.
            </p>
            <div className='flex flex-wrap gap-3'>
              <button
                onClick={handleConnect}
                className='rounded-lg border border-cyan-300/80 bg-cyan-400/10 px-4 py-2 text-cyan-100 transition hover:shadow-neon'
              >
                {activeAddress ? 'Connected' : 'Connect Wallet'}
              </button>
              <Link to='/grants' className='rounded-lg border border-slate-700 px-4 py-2 text-slate-200 transition hover:border-cyan-300 hover:text-cyan-200'>
                Browse Grants
              </Link>
            </div>
          </div>

          <div className='relative mx-auto h-64 w-full max-w-sm rounded-2xl border border-cyan-400/30 bg-slate-950/80 p-4'>
            <div className='absolute inset-4 rounded-xl border border-cyan-500/20' />
            <div className='absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300 shadow-neon' />
            <div className='absolute left-10 top-8 h-2.5 w-2.5 animate-pulse rounded-full bg-teal-300' />
            <div className='absolute right-8 top-14 h-2.5 w-2.5 animate-pulse rounded-full bg-cyan-300 [animation-delay:300ms]' />
            <div className='absolute bottom-12 left-12 h-2.5 w-2.5 animate-pulse rounded-full bg-cyan-300 [animation-delay:500ms]' />
            <div className='absolute bottom-8 right-16 h-2.5 w-2.5 animate-pulse rounded-full bg-teal-300 [animation-delay:700ms]' />
            <div className='absolute left-[27%] top-[35%] h-px w-24 rotate-12 bg-gradient-to-r from-cyan-400/0 via-cyan-400/70 to-cyan-400/0' />
            <div className='absolute right-[24%] top-[50%] h-px w-28 -rotate-12 bg-gradient-to-r from-cyan-400/0 via-cyan-400/80 to-cyan-400/0' />
            <div className='absolute bottom-[25%] left-[30%] h-px w-24 -rotate-[28deg] bg-gradient-to-r from-cyan-400/0 via-cyan-400/80 to-cyan-400/0' />
          </div>
        </div>
      </section>

      <section>
        <h2 className='mb-5 font-space text-2xl text-cyan-100'>Core Features</h2>
        <div className='grid gap-4 md:grid-cols-3'>
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <article key={feature.title} className='rounded-2xl border border-cyan-500/25 bg-slate-900/60 p-5 transition hover:border-cyan-300 hover:shadow-neon-sm'>
                <Icon size={20} className='mb-3 text-cyan-300' />
                <h3 className='font-space text-lg text-white'>{feature.title}</h3>
                <p className='mt-2 text-sm text-slate-300'>{feature.description}</p>
              </article>
            )
          })}
        </div>
      </section>

      <section>
        <h2 className='mb-5 font-space text-2xl text-cyan-100'>How It Works</h2>
        <div className='grid gap-4 md:grid-cols-3'>
          {flow.map((step, index) => (
            <div key={step} className='relative rounded-xl border border-slate-700 bg-slate-900/70 p-4'>
              <span className='mb-2 inline-block rounded-full border border-cyan-500/60 px-2 py-1 font-mono text-xs text-cyan-200'>Step {index + 1}</span>
              <p className='font-space text-lg text-slate-100'>{step}</p>
            </div>
          ))}
        </div>
      </section>

      <section className='rounded-2xl border border-cyan-500/20 bg-slate-900/60 p-5'>
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          <div>
            <p className='font-mono text-xs uppercase text-slate-400'>Total Grants</p>
            <p className='font-space text-2xl text-cyan-100'>{landingStats.totalGrants}</p>
          </div>
          <div>
            <p className='font-mono text-xs uppercase text-slate-400'>Total Funded</p>
            <p className='font-space text-2xl text-cyan-100'>{landingStats.totalFunded.toLocaleString()} ALGO</p>
          </div>
          <div>
            <p className='font-mono text-xs uppercase text-slate-400'>Active Projects</p>
            <p className='font-space text-2xl text-cyan-100'>{landingStats.activeProjects}</p>
          </div>
          <div>
            <p className='font-mono text-xs uppercase text-slate-400'>Milestones Completed</p>
            <p className='font-space text-2xl text-cyan-100'>{landingStats.milestonesCompleted}</p>
          </div>
        </div>
      </section>

      <footer className='rounded-2xl border border-slate-800 bg-slate-900/60 p-5'>
        <div className='flex flex-wrap items-center justify-between gap-3 text-sm text-slate-400'>
          <p className='font-mono'>Vitta - Transparent Grants on Algorand</p>
          <div className='flex flex-wrap gap-4'>
            <Link to='/grants' className='hover:text-cyan-200'>Grants</Link>
            <Link to='/dashboard' className='hover:text-cyan-200'>Dashboard</Link>
            <Link to='/dao' className='hover:text-cyan-200'>DAO</Link>
            <Link to='/analytics' className='hover:text-cyan-200'>Analytics</Link>
          </div>
        </div>
      </footer>
      <ConnectWallet openModal={isModalOpen} closeModal={toggleModal} />
    </div>
  )
}
