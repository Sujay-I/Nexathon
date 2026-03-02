import { Bar, BarChart, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { analyticsData } from '../data/mockData'

const colors = ['#06b6d4', '#14b8a6', '#22d3ee', '#ef4444', '#f59e0b', '#38bdf8']

export default function AnalyticsPage() {
  // TODO: fetch from backend analytics API
  const { fundsOverTime, milestoneCompletion, topFundedProjects, categoryBreakdown } = analyticsData

  return (
    <div className='space-y-5'>
      <h1 className='font-space text-3xl text-cyan-100'>Analytics Dashboard</h1>
      <div className='grid gap-4 xl:grid-cols-2'>
        <section className='rounded-xl border border-slate-700 bg-slate-900/60 p-4'>
          <h2 className='mb-3 font-space text-lg text-cyan-100'>Total Funds Distributed Over Time</h2>
          <div className='h-72'>
            <ResponsiveContainer width='100%' height='100%'>
              <LineChart data={fundsOverTime}>
                <XAxis dataKey='month' stroke='#94a3b8' />
                <YAxis stroke='#94a3b8' />
                <Tooltip contentStyle={{ background: '#020617', border: '1px solid #0891b2' }} />
                <Line type='monotone' dataKey='amount' stroke='#22d3ee' strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className='rounded-xl border border-slate-700 bg-slate-900/60 p-4'>
          <h2 className='mb-3 font-space text-lg text-cyan-100'>Milestone Completion Rate</h2>
          <div className='h-72'>
            <ResponsiveContainer width='100%' height='100%'>
              <PieChart>
                <Pie data={milestoneCompletion} innerRadius={70} outerRadius={110} dataKey='value' nameKey='name' paddingAngle={2}>
                  {milestoneCompletion.map((entry, index) => (
                    <Cell key={entry.name} fill={colors[index]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip contentStyle={{ background: '#020617', border: '1px solid #0891b2' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className='rounded-xl border border-slate-700 bg-slate-900/60 p-4'>
          <h2 className='mb-3 font-space text-lg text-cyan-100'>Top Funded Projects</h2>
          <div className='h-72'>
            <ResponsiveContainer width='100%' height='100%'>
              <BarChart data={topFundedProjects} layout='vertical' margin={{ left: 24 }}>
                <XAxis type='number' stroke='#94a3b8' />
                <YAxis dataKey='project' type='category' stroke='#94a3b8' width={140} />
                <Tooltip contentStyle={{ background: '#020617', border: '1px solid #0891b2' }} />
                <Bar dataKey='value' fill='#06b6d4' />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className='rounded-xl border border-slate-700 bg-slate-900/60 p-4'>
          <h2 className='mb-3 font-space text-lg text-cyan-100'>Category Breakdown</h2>
          <div className='h-72'>
            <ResponsiveContainer width='100%' height='100%'>
              <PieChart>
                <Pie data={categoryBreakdown} dataKey='value' nameKey='name' outerRadius={110}>
                  {categoryBreakdown.map((entry, index) => (
                    <Cell key={entry.name} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip contentStyle={{ background: '#020617', border: '1px solid #0891b2' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>
    </div>
  )
}
