import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Wallet2, LogIn, LogOut, User } from 'lucide-react'
import { useWallet } from '@txnlab/use-wallet-react'
import { useState } from 'react'
import ConnectWallet from '../components/ConnectWallet'
import { useAuth } from '../context/AuthContext'

const links = [
  { to: '/', label: 'Home' },
  { to: '/grants', label: 'Grants' },
  { to: '/create-grant', label: 'Create Grant' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/dao', label: 'DAO' },
  { to: '/analytics', label: 'Analytics' },
  { to: '/wallet', label: 'Wallet' },
]

const roleColors = {
  student: 'bg-blue-500/15 text-blue-200 border-blue-400/40',
  admin: 'bg-blue-400/15 text-blue-100 border-blue-300/40',
  teacher: 'bg-blue-600/15 text-blue-200 border-blue-500/40',
}

export default function Navbar() {
  const { activeAddress } = useWallet()
  const { user, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const toggleModal = () => setIsModalOpen(!isModalOpen)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className='sticky top-0 z-50 border-b border-blue-500/15 bg-[#060e24]/90 backdrop-blur-xl'>
      <div className='mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 lg:px-8'>
        <Link to='/' className='font-space text-2xl font-bold tracking-wide text-blue-300'>
          Vitta
        </Link>
        <nav className='hidden items-center gap-1 md:flex'>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-md px-3 py-2 text-sm transition ${isActive ? 'bg-blue-500/20 text-blue-200' : 'text-blue-300/60 hover:bg-blue-500/10 hover:text-blue-200'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className='flex items-center gap-2'>
          {isAuthenticated ? (
            <>
              <div className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-1.5 text-xs font-medium ${roleColors[user.role] || roleColors.student}`}>
                <User size={13} />
                <span className='hidden sm:inline'>{user.name}</span>
                <span className='rounded bg-blue-400/15 px-1.5 py-0.5 text-[10px] uppercase tracking-wider'>{user.role}</span>
              </div>
              <button
                id='logout-btn'
                onClick={handleLogout}
                className='inline-flex items-center gap-1.5 rounded-md border border-blue-400/20 bg-blue-500/10 px-2.5 py-1.5 text-xs text-blue-300 transition hover:bg-blue-500/20 hover:text-blue-200'
              >
                <LogOut size={13} />
                <span className='hidden sm:inline'>Logout</span>
              </button>
            </>
          ) : (
            <NavLink
              to='/login'
              id='login-nav-btn'
              className={({ isActive }) =>
                `inline-flex items-center gap-1.5 rounded-md border px-3 py-2 font-mono text-sm transition ${isActive ? 'border-blue-400/50 bg-blue-500/20 text-blue-200' : 'border-blue-700/40 text-blue-300/70 hover:border-blue-400/50 hover:text-blue-200'}`
              }
            >
              <LogIn size={15} />
              Login
            </NavLink>
          )}
          <button
            onClick={toggleModal}
            className='inline-flex items-center gap-2 rounded-md border border-blue-400/40 bg-blue-500/10 px-3 py-2 font-mono text-sm text-blue-200 transition hover:bg-blue-500/20 hover:shadow-[0_0_20px_rgba(59,130,246,0.25)]'
          >
            <Wallet2 size={16} />
            {activeAddress ? `${activeAddress.slice(0, 6)}...${activeAddress.slice(-4)}` : 'Connect Wallet'}
          </button>
        </div>
      </div>
      <ConnectWallet openModal={isModalOpen} closeModal={toggleModal} />
    </header>
  )
}


