import { useMemo, useState } from 'react'
import GrantCard from '../components/GrantCard'
import { grants } from '../data/mockData'

export default function GrantsPage() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('All')
  const [category, setCategory] = useState('All')
  const [range, setRange] = useState('All')
  const [page, setPage] = useState(1)

  const categories = useMemo(() => ['All', ...new Set(grants.map((grant) => grant.category))], [])

  const filtered = useMemo(() => {
    return grants.filter((grant) => {
      const bySearch = grant.projectName.toLowerCase().includes(search.toLowerCase()) || grant.sponsor.toLowerCase().includes(search.toLowerCase())
      const byStatus = status === 'All' || grant.status === status
      const byCategory = category === 'All' || grant.category === category
      const byRange =
        range === 'All' ||
        (range === '0-100k' && grant.totalAmount <= 100000) ||
        (range === '100k-200k' && grant.totalAmount > 100000 && grant.totalAmount <= 200000) ||
        (range === '200k+' && grant.totalAmount > 200000)

      return bySearch && byStatus && byCategory && byRange
    })
  }, [search, status, category, range])

  const pageSize = 6
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize)

  return (
    <div className='space-y-6'>
      <div className='rounded-2xl border border-cyan-500/30 bg-slate-900/60 p-5'>
        <h1 className='font-space text-3xl text-cyan-100'>Browse Grants</h1>
        <p className='mt-2 text-slate-300'>Search and filter transparent milestone-driven grants.</p>
        <div className='mt-4 grid gap-3 md:grid-cols-4'>
          <input value={search} onChange={(event) => setSearch(event.target.value)} className='rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none ring-cyan-400/50 focus:ring' placeholder='Search project or sponsor' />
          <div className='flex flex-col'>
            <label className='mb-1 font-mono text-xs uppercase tracking-widest text-slate-400'>Status</label>
            <select value={status} onChange={(event) => setStatus(event.target.value)} className='rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm'>
              {['All', 'Active', 'Completed', 'Pending'].map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>
          <div className='flex flex-col'>
            <label className='mb-1 font-mono text-xs uppercase tracking-widest text-slate-400'>Category</label>
            <select value={category} onChange={(event) => setCategory(event.target.value)} className='rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm'>
              {categories.map((item) => (
                <option key={item}>{item}</option>
              ))}
              <option title='Projects not covered by the above categories'>Other</option>
            </select>
          </div>
          <div className='flex flex-col'>
            <label className='mb-1 font-mono text-xs uppercase tracking-widest text-slate-400'>Budget Range</label>
            <select value={range} onChange={(event) => setRange(event.target.value)} className='rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm'>
              {['All', '0-100k', '100k-200k', '200k+'].map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-3'>
        {paged.map((grant) => (
          <GrantCard key={grant.id} grant={grant} />
        ))}
      </div>

      <div className='flex items-center justify-between rounded-xl border border-slate-700 bg-slate-900/60 p-4'>
        <p className='font-mono text-xs text-slate-400'>Pagination placeholder - page {page} of {totalPages}</p>
        <div className='flex gap-2'>
          <button onClick={() => setPage((value) => Math.max(1, value - 1))} className='rounded border border-slate-700 px-3 py-1 text-sm hover:border-cyan-300'>
            Prev
          </button>
          <button onClick={() => setPage((value) => Math.min(totalPages, value + 1))} className='rounded border border-slate-700 px-3 py-1 text-sm hover:border-cyan-300'>
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
