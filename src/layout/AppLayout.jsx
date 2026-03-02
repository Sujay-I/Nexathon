import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { useAuth } from '../context/AuthContext'
import AnimatedBackground from '../components/AnimatedBackground'

const sidebarRoots = ['/dashboard', '/create-grant', '/dao', '/analytics', '/wallet']

export default function AppLayout() {
  const location = useLocation()
  const { isAuthenticated } = useAuth()
  const showSidebar = isAuthenticated && sidebarRoots.some((route) => location.pathname.startsWith(route))

  return (
    <div className='min-h-screen bg-[#040a18] text-blue-50'>
      <AnimatedBackground />
      {isAuthenticated && <Navbar />}
      <div className='relative z-10 mx-auto flex w-full max-w-7xl'>
        {showSidebar && <Sidebar />}
        <main className={`${isAuthenticated ? 'min-h-[calc(100vh-73px)]' : 'min-h-screen'} flex-1 px-4 py-6 lg:px-8`}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
