export default function LoadingSpinner({ className = '' }) {
  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <div className='h-5 w-5 animate-spin rounded-full border-2 border-cyan-300 border-t-transparent' />
    </div>
  )
}
