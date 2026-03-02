import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className='mx-auto max-w-lg rounded-2xl border border-rose-500/30 bg-slate-900/60 p-8 text-center'>
      <h1 className='font-space text-4xl text-rose-200'>404</h1>
      <p className='mt-3 text-slate-300'>The page you requested does not exist.</p>
      <Link to='/' className='mt-5 inline-flex rounded border border-cyan-400/70 px-4 py-2 text-cyan-200'>
        Return Home
      </Link>
    </div>
  )
}
