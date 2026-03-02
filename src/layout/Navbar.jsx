import { Link, NavLink } from 'react-router-dom'
import { Wallet2 } from 'lucide-react'

const links = [
  { to: '/', label: 'Home' },
  { to: '/grants', label: 'Grants' },
  { to: '/create-grant', label: 'Create Grant' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/dao', label: 'DAO' },
  { to: '/analytics', label: 'Analytics' },
  { to: '/wallet', label: 'Wallet' },
]

export default function Navbar() {
  return (
    <header className='sticky top-0 z-50 border-b border-cyan-500/20 bg-slate-950/80 backdrop-blur-xl'>
      <div className='mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 lg:px-8'>
        <Link to='/' className='font-space text-2xl font-bold tracking-wide text-cyan-300'>
          Vitta
        </Link>
        <nav className='hidden items-center gap-1 md:flex'>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-md px-3 py-2 text-sm transition ${isActive ? 'bg-cyan-500/20 text-cyan-200' : 'text-slate-300 hover:bg-slate-800 hover:text-cyan-200'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <button className='inline-flex items-center gap-2 rounded-md border border-cyan-400/70 bg-cyan-500/10 px-3 py-2 font-mono text-sm text-cyan-200 transition hover:shadow-neon'>
          <Wallet2 size={16} /> Connect Wallet
        </button>
      </div>
    </header>
  )
}
