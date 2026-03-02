import { createContext, useCallback, useContext, useMemo, useState } from 'react'

const ToastContext = createContext(null)

function Toast({ toast, onClose }) {
  const palette = {
    success: 'border-emerald-400/60 text-emerald-200',
    error: 'border-rose-400/60 text-rose-200',
    info: 'border-cyan-400/60 text-cyan-100',
  }

  return (
    <div className={`w-full rounded-lg border bg-slate-900/90 p-3 shadow-neon-sm backdrop-blur ${palette[toast.type] || palette.info}`}>
      <div className='flex items-start justify-between gap-3'>
        <p className='font-mono text-xs'>{toast.message}</p>
        <button onClick={() => onClose(toast.id)} className='text-xs text-slate-400 hover:text-slate-200'>
          x
        </button>
      </div>
    </div>
  )
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const notify = useCallback((message, type = 'info') => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
    setToasts((prev) => [...prev, { id, message, type }])
    window.setTimeout(() => removeToast(id), 3600)
  }, [removeToast])

  const value = useMemo(() => ({ notify }), [notify])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className='fixed right-4 top-20 z-[100] flex w-72 flex-col gap-2'>
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} onClose={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) throw new Error('useToast must be used within ToastProvider')
  return context
}
