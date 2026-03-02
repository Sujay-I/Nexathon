import { useAuth } from '../context/AuthContext'
import { GraduationCap, ShieldCheck, BookOpen, Plus, FileText, Clock, TrendingUp, Users, BarChart3, CheckCircle2, AlertCircle, FolderOpen } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

/* ── role config ── */
const roleConfig = {
  student: {
    title: 'Student Dashboard',
    icon: GraduationCap,
    accent: 'blue-400',
    sections: [
      { label: 'My Grants', value: '—', icon: FolderOpen, description: 'Grants you have applied for' },
      { label: 'Pending Milestones', value: '—', icon: Clock, description: 'Milestones awaiting completion' },
      { label: 'Funds Received', value: '—', icon: TrendingUp, description: 'Total ALGO received' },
      { label: 'Completion', value: '—', icon: CheckCircle2, description: 'Overall progress' },
    ],
    actions: [
      { label: 'Apply for Grant', to: '/create-grant', icon: Plus },
      { label: 'View My Grants', to: '/grants', icon: FolderOpen },
      { label: 'Submit Milestone Proof', to: '/dashboard', icon: FileText },
    ],
    emptyMessage: 'You haven\'t applied for any grants yet. Start by browsing available grants or creating a new application.',
  },
  admin: {
    title: 'Admin Dashboard',
    icon: ShieldCheck,
    accent: 'blue-300',
    sections: [
      { label: 'Total Grants', value: '—', icon: FolderOpen, description: 'All grants on the platform' },
      { label: 'Pending Approvals', value: '—', icon: AlertCircle, description: 'Grants awaiting review' },
      { label: 'Total Disbursed', value: '—', icon: TrendingUp, description: 'ALGO disbursed to date' },
      { label: 'Active Projects', value: '—', icon: BarChart3, description: 'Currently active grants' },
    ],
    actions: [
      { label: 'Review Proposals', to: '/grants', icon: FileText },
      { label: 'Platform Analytics', to: '/analytics', icon: BarChart3 },
      { label: 'DAO Governance', to: '/dao', icon: Users },
    ],
    emptyMessage: 'No grants require attention at this time. Monitor the platform through Analytics or review DAO proposals.',
  },
  teacher: {
    title: 'Teacher Dashboard',
    icon: BookOpen,
    accent: 'blue-500',
    sections: [
      { label: 'Students Mentored', value: '—', icon: Users, description: 'Students under your guidance' },
      { label: 'Milestones to Review', value: '—', icon: Clock, description: 'Pending milestone reviews' },
      { label: 'Grants Supervised', value: '—', icon: FolderOpen, description: 'Grants you are overseeing' },
      { label: 'Approval Rate', value: '—', icon: CheckCircle2, description: 'Your milestone approval rate' },
    ],
    actions: [
      { label: 'Review Milestones', to: '/grants', icon: FileText },
      { label: 'Student Proposals', to: '/grants', icon: GraduationCap },
      { label: 'DAO Voting', to: '/dao', icon: Users },
    ],
    emptyMessage: 'No student proposals need review at the moment. Check back later or browse existing grants.',
  },
}

export default function DashboardPage() {
  const { user } = useAuth()
  const role = user?.role || 'student'
  const config = roleConfig[role] || roleConfig.student
  const RoleIcon = config.icon

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center gap-3'>
        <div className='rounded-xl bg-blue-500/15 p-2.5'>
          <RoleIcon size={24} className='text-blue-300' />
        </div>
        <div>
          <h1 className='font-space text-3xl font-bold text-white'>{config.title}</h1>
          <p className='text-sm text-blue-300/60'>
            Welcome back, <span className='text-blue-200'>{user?.name || 'User'}</span>
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-4'>
        {config.sections.map((section) => {
          const Icon = section.icon
          return (
            <div
              key={section.label}
              className='group rounded-xl border border-blue-500/15 bg-blue-950/30 p-4 transition hover:border-blue-400/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)]'
            >
              <div className='mb-3 flex items-center justify-between'>
                <p className='font-mono text-xs uppercase tracking-wider text-blue-300/50'>{section.label}</p>
                <Icon size={16} className='text-blue-400/40' />
              </div>
              <p className='font-space text-2xl font-semibold text-white'>{section.value}</p>
              <p className='mt-1 text-xs text-blue-300/40'>{section.description}</p>
            </div>
          )
        })}
      </div>

      {/* Main Content Area */}
      <div className='grid gap-4 lg:grid-cols-3'>
        {/* Empty State - Activity */}
        <div className='col-span-2 rounded-xl border border-blue-500/15 bg-blue-950/30 p-6'>
          <h2 className='mb-4 font-space text-xl font-semibold text-white'>Recent Activity</h2>
          <div className='flex flex-col items-center justify-center py-12 text-center'>
            <div className='mb-4 rounded-2xl bg-blue-500/10 p-4'>
              <FileText size={32} className='text-blue-400/40' />
            </div>
            <p className='max-w-sm text-sm leading-relaxed text-blue-300/50'>
              {config.emptyMessage}
            </p>
            <Link
              to='/grants'
              className='mt-5 inline-flex items-center gap-2 rounded-lg border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-200 transition hover:bg-blue-500/20'
            >
              <FolderOpen size={15} />
              Browse Grants
            </Link>
          </div>
        </div>

        {/* Quick Actions */}
        <div className='rounded-xl border border-blue-500/15 bg-blue-950/30 p-6'>
          <h2 className='mb-4 font-space text-xl font-semibold text-white'>Quick Actions</h2>
          <div className='space-y-2'>
            {config.actions.map((action) => {
              const ActionIcon = action.icon
              return (
                <Link
                  key={action.label}
                  to={action.to}
                  className='flex items-center gap-3 rounded-lg border border-blue-700/20 bg-blue-900/20 px-4 py-3 text-sm text-blue-200 transition hover:border-blue-500/30 hover:bg-blue-500/10 hover:text-white'
                >
                  <ActionIcon size={16} className='text-blue-400/60' />
                  {action.label}
                </Link>
              )
            })}
          </div>

          {/* Role Info */}
          <div className='mt-6 rounded-lg border border-blue-700/15 bg-blue-900/10 p-3'>
            <p className='font-mono text-[10px] uppercase tracking-widest text-blue-400/40'>Signed in as</p>
            <p className='mt-1 text-sm font-medium text-blue-200'>{user?.name}</p>
            <p className='text-xs text-blue-300/40'>{user?.email}</p>
            <div className='mt-2 inline-block rounded bg-blue-500/15 px-2 py-0.5 text-[10px] uppercase tracking-wider text-blue-300'>
              {role}
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming - Empty */}
      <div className='rounded-xl border border-blue-500/15 bg-blue-950/30 p-6'>
        <h2 className='mb-4 font-space text-xl font-semibold text-white'>
          {role === 'student' ? 'My Milestones' : role === 'teacher' ? 'Milestones to Review' : 'Platform Overview'}
        </h2>
        <div className='flex items-center justify-center rounded-lg border border-dashed border-blue-700/20 py-10'>
          <div className='text-center'>
            <Clock size={24} className='mx-auto mb-2 text-blue-400/30' />
            <p className='text-sm text-blue-300/40'>No data yet</p>
            <p className='mt-1 text-xs text-blue-400/25'>
              {role === 'student'
                ? 'Your milestones will appear here once you join a grant'
                : role === 'teacher'
                  ? 'Student milestones will appear here for review'
                  : 'Platform metrics will populate as grants are created'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
