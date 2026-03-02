import { Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from './layout/AppLayout'
import LandingPage from './pages/LandingPage'
import GrantsPage from './pages/GrantsPage'
import GrantDetailPage from './pages/GrantDetailPage'
import CreateGrantPage from './pages/CreateGrantPage'
import DashboardPage from './pages/DashboardPage'
import DaoPage from './pages/DaoPage'
import AnalyticsPage from './pages/AnalyticsPage'
import WalletPage from './pages/WalletPage'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path='/' element={<LandingPage />} />
        <Route path='/grants' element={<GrantsPage />} />
        <Route path='/grants/:id' element={<GrantDetailPage />} />
        <Route path='/create-grant' element={<CreateGrantPage />} />
        <Route path='/dashboard' element={<DashboardPage />} />
        <Route path='/dao' element={<DaoPage />} />
        <Route path='/analytics' element={<AnalyticsPage />} />
        <Route path='/wallet' element={<WalletPage />} />
        <Route path='/home' element={<Navigate to='/' replace />} />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
