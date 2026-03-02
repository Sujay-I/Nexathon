import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

const sidebarRoots = ['/dashboard', '/create-grant', '/dao', '/analytics', '/wallet']

export default function AppLayout() {
  const location = useLocation()
  const showSidebar = sidebarRoots.some((route) => location.pathname.startsWith(route))

  return (
    <div className='min-h-screen bg-slate-950 text-slate-100'>
      <div className='pointer-events-none fixed inset-0 opacity-30 [background-image:linear-gradient(rgba(10,132,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(10,132,255,0.12)_1px,transparent_1px)] [background-size:36px_36px]' />
      <div className='pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,0.25),transparent_45%),radial-gradient(circle_at_bottom_left,rgba(20,184,166,0.2),transparent_50%)]' />
      <Navbar />
      <div className='relative z-10 mx-auto flex w-full max-w-7xl'>
        {showSidebar && <Sidebar />}
        <main className='min-h-[calc(100vh-73px)] flex-1 px-4 py-6 lg:px-8'>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
