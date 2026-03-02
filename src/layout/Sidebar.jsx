import { NavLink } from 'react-router-dom'
import { BarChart3, LayoutDashboard, PlusSquare, Vote, WalletCards } from 'lucide-react'

const items = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/create-grant', label: 'Create Grant', icon: PlusSquare },
  { to: '/dao', label: 'DAO', icon: Vote },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/wallet', label: 'Wallet', icon: WalletCards },
]

export default function Sidebar() {
  return (
    <aside className='hidden h-[calc(100vh-73px)] w-64 shrink-0 border-r border-blue-500/15 bg-[#060e24]/60 p-4 lg:block'>
      <div className='mb-4 rounded-lg border border-blue-500/25 bg-[#040a18]/70 p-3 font-mono text-xs text-blue-300'>
        DASHBOARD MODULES
      </div>
      <div className='space-y-1'>
        {items.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${isActive ? 'bg-blue-500/20 text-blue-200' : 'text-blue-300/60 hover:bg-blue-500/10 hover:text-blue-200'}`
              }
            >
              <Icon size={16} />
              <span>{item.label}</span>
            </NavLink>
          )
        })}
      </div>
    </aside>
  )
}
