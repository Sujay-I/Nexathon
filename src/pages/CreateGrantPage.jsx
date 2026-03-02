import { useMemo, useState } from 'react'
import { useToast } from '../context/ToastContext'
import { useWallet } from '@txnlab/use-wallet-react'
import algosdk from 'algosdk'
import { getAlgodConfigFromViteEnvironment } from '../utils/network/getAlgoClientConfigs'

const emptyMilestone = () => ({
  name: '',
  description: '',
  amount: '',
  expectedDate: '',
  proofType: 'Document',
})

export default function CreateGrantPage() {
  const { notify } = useToast()
  const { activeAddress, transactionSigner } = useWallet()
  const today = new Date().toISOString().split('T')[0]
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    totalAmount: '',
    deadline: '',
    sponsorWallet: '',
    milestones: [emptyMilestone()],
  })
  const [errors, setErrors] = useState({})

  const progress = useMemo(() => (step / 3) * 100, [step])

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const updateMilestone = (index, field, value) => {
    setForm((prev) => {
      const next = [...prev.milestones]
      next[index] = { ...next[index], [field]: value }
      return { ...prev, milestones: next }
    })
  }

  const addMilestone = () => setForm((prev) => ({ ...prev, milestones: [...prev.milestones, emptyMilestone()] }))
  const removeMilestone = (index) => setForm((prev) => ({ ...prev, milestones: prev.milestones.filter((_, i) => i !== index) }))

  const validateStep = (currentStep) => {
    const nextErrors = {}

    if (currentStep === 1) {
      if (!form.title.trim()) nextErrors.title = 'Title is required'
      if (!form.description.trim()) nextErrors.description = 'Description is required'
      if (!form.category.trim()) nextErrors.category = 'Category is required'
      if (!form.totalAmount || Number(form.totalAmount) <= 0) nextErrors.totalAmount = 'Total amount must be greater than 0'
      if (!form.deadline) nextErrors.deadline = 'Deadline is required'
      if (!form.sponsorWallet.trim()) nextErrors.sponsorWallet = 'Sponsor wallet address is required'
    }

    if (currentStep === 2) {
      form.milestones.forEach((milestone, index) => {
        if (!milestone.name.trim()) nextErrors[`milestone-name-${index}`] = 'Milestone name is required'
        if (!milestone.description.trim()) nextErrors[`milestone-description-${index}`] = 'Milestone description is required'
        if (!milestone.amount || Number(milestone.amount) <= 0) nextErrors[`milestone-amount-${index}`] = 'Funding amount must be greater than 0'
        if (!milestone.expectedDate) nextErrors[`milestone-date-${index}`] = 'Expected completion date is required'
      })

      const totalMilestones = form.milestones.reduce((sum, milestone) => sum + Number(milestone.amount || 0), 0)
      if (Number(form.totalAmount || 0) !== totalMilestones) nextErrors.milestoneTotal = 'Sum of milestone amounts must match total amount'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const nextStep = () => {
    if (!validateStep(step)) return
    setStep((value) => Math.min(3, value + 1))
  }

  const prevStep = () => setStep((value) => Math.max(1, value - 1))

  const submitGrant = async () => {
    if (!activeAddress) {
      notify('Please connect your wallet first', 'warning')
      return
    }

    if (!validateStep(2)) {
      setStep(2)
      return
    }

    try {
      notify('Initiating Grant Deployment (Demo Transaction)...', 'info')

      const config = getAlgodConfigFromViteEnvironment()
      const algodClient = new algosdk.Algodv2(config.token, config.server, config.port)

      // Pre-flight balance check
      try {
        const accountInfo = await algodClient.accountInformation(activeAddress).do()
        const balanceMicroAlgos = accountInfo.amount
        if (balanceMicroAlgos < 200_000) { // 0.2 ALGO to be safe (min balance + txn fee + demo amount)
          notify('Insufficient Funds: Please visit the Testnet Dispenser (bank.testnet.algorand.network) to get free ALGO.', 'error')
          return
        }
      } catch (e) {
        console.warn('Balance check failed - might be a new account. Continuing anyway but transaction may fail.')
      }

      const params = await algodClient.getTransactionParams().do()

      // Demo Transaction: Send 0.1 ALGO to the sponsor address (as a self-test/funding demo)
      const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        sender: activeAddress,
        receiver: form.sponsorWallet || activeAddress,
        amount: 100_000, // 0.1 ALGO
        suggestedParams: params,
        note: new Uint8Array(Buffer.from(`Vitta Grant: ${form.title}`)),
      })

      const encodedTxn = algosdk.encodeUnsignedTransaction(txn)
      const [signedTxn] = await transactionSigner([encodedTxn])

      const { txId } = await algodClient.sendRawTransaction(signedTxn).do()

      notify(`Transaction Sent! ID: ${txId.slice(0, 8)}...`, 'info')

      await algosdk.waitForConfirmation(algodClient, txId, 4)

      notify(`Grant System Deployed Successfully! Tx: ${txId.slice(0, 12)}...`, 'success')

      // Save to Backend
      try {
        const response = await fetch('http://localhost:3001/api/grants', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: `grant-${Date.now()}`,
            ...form,
            txId
          })
        })
        if (response.ok) {
          notify('Grant data persisted to database', 'success')
        }
      } catch (err) {
        console.error('Failed to save to backend:', err)
        notify('Transaction succeeded but failed to save to database', 'warning')
      }

      setStep(3)
    } catch (error) {
      console.error('Deployment error:', error)
      const msg = error.message.toLowerCase().includes('spend')
        ? 'Insufficient Funds on Testnet. Get free ALGO at: bank.testnet.algorand.network'
        : error.message
      notify(`Deployment failed: ${msg}`, 'error')
    }
  }

  return (
    <div className='space-y-5'>
      <div className='rounded-2xl border border-cyan-500/30 bg-slate-900/60 p-5'>
        <h1 className='font-space text-3xl text-cyan-100'>Create New Grant</h1>
        <p className='mt-1 text-slate-300'>Deploy a milestone-based grant smart contract flow.</p>
        <div className='mt-4 h-2 rounded-full bg-slate-800'>
          <div className='h-2 rounded-full bg-cyan-400 transition-all duration-700' style={{ width: `${progress}%` }} />
        </div>
        <div className='mt-2 flex items-center gap-3 font-mono text-xs text-slate-400'>
          <span className={step === 1 ? 'text-cyan-200' : ''}>Step 1: Details</span>
          <span className={step === 2 ? 'text-cyan-200' : ''}>Step 2: Milestones</span>
          <span className={step === 3 ? 'text-cyan-200' : ''}>Step 3: Review</span>
        </div>
      </div>

      {step === 1 && (
        <div className='rounded-2xl border border-slate-700 bg-slate-900/60 p-5'>
          <h2 className='mb-4 font-space text-xl text-cyan-100'>Grant Details</h2>
          <div className='grid gap-3 md:grid-cols-2'>
            <input className='rounded border border-slate-700 bg-slate-950 px-3 py-2' placeholder='Title' value={form.title} onChange={(event) => updateField('title', event.target.value)} />
            <select className='rounded border border-slate-700 bg-slate-950 px-3 py-2 focus:border-cyan-400/70 focus:outline-none' value={form.category} onChange={(event) => updateField('category', event.target.value)}>
              <option value='' disabled className='text-slate-500'>
                Select Category
              </option>
              <option value='Agriculture'>Agriculture</option>
              <option value='Healthcare'>Healthcare</option>
              <option value='Education'>Education</option>
              <option value='Energy'>Energy</option>
              <option value='Environment'>Environment</option>
              <option value='Workforce'>Workforce</option>
              <option value='Other'>Other - Projects not covered by the above categories</option>
            </select>
            <input
              className='rounded border border-slate-700 bg-slate-950 px-3 py-2'
              type='number'
              min={0}
              placeholder='Total Amount (ALGO)'
              value={form.totalAmount}
              onKeyDown={(event) => {
                if (event.key === '-' || event.key.toLowerCase() === 'e') event.preventDefault()
              }}
              onChange={(event) => {
                const value = Number(event.target.value)
                updateField('totalAmount', Number.isNaN(value) ? '' : Math.max(0, value))
              }}
            />
            <input className='rounded border border-slate-700 bg-slate-950 px-3 py-2 accent-cyan-400 focus:border-cyan-400/70 focus:outline-none [color-scheme:dark]' type='date' min={today} value={form.deadline} onChange={(event) => updateField('deadline', event.target.value)} />
            <input className='rounded border border-slate-700 bg-slate-950 px-3 py-2 md:col-span-2' placeholder='Sponsor Wallet Address' value={form.sponsorWallet} onChange={(event) => updateField('sponsorWallet', event.target.value)} />
            <textarea className='min-h-28 rounded border border-slate-700 bg-slate-950 px-3 py-2 md:col-span-2' placeholder='Description' value={form.description} onChange={(event) => updateField('description', event.target.value)} />
          </div>
          {Object.values(errors).map((error) => (
            <p key={error} className='mt-2 text-xs text-rose-300'>{error}</p>
          ))}
        </div>
      )}

      {step === 2 && (
        <div className='rounded-2xl border border-slate-700 bg-slate-900/60 p-5'>
          <div className='mb-4 flex items-center justify-between'>
            <h2 className='font-space text-xl text-cyan-100'>Milestone Configuration</h2>
            <button onClick={addMilestone} className='rounded border border-cyan-400/60 px-3 py-2 text-sm text-cyan-200'>Add Milestone</button>
          </div>
          <div className='space-y-4'>
            {form.milestones.map((milestone, index) => (
              <div key={`milestone-${index}`} className='rounded-xl border border-slate-700 bg-slate-950/60 p-4'>
                <div className='mb-3 flex items-center justify-between'>
                  <p className='font-mono text-xs text-slate-400'>Milestone {index + 1}</p>
                  {form.milestones.length > 1 && (
                    <button onClick={() => removeMilestone(index)} className='text-xs text-rose-300'>Remove</button>
                  )}
                </div>
                <div className='grid gap-3 md:grid-cols-2'>
                  <input className='rounded border border-slate-700 bg-slate-950 px-3 py-2' placeholder='Milestone Name' value={milestone.name} onChange={(event) => updateMilestone(index, 'name', event.target.value)} />
                  <input className='rounded border border-slate-700 bg-slate-950 px-3 py-2' type='number' placeholder='Funding Amount (ALGO)' value={milestone.amount} onChange={(event) => updateMilestone(index, 'amount', event.target.value)} />
                  <input className='rounded border border-slate-700 bg-slate-950 px-3 py-2' type='date' value={milestone.expectedDate} onChange={(event) => updateMilestone(index, 'expectedDate', event.target.value)} />
                  <select className='rounded border border-slate-700 bg-slate-950 px-3 py-2' value={milestone.proofType} onChange={(event) => updateMilestone(index, 'proofType', event.target.value)}>
                    {['Document', 'Demo', 'Report'].map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                  <textarea className='min-h-24 rounded border border-slate-700 bg-slate-950 px-3 py-2 md:col-span-2' placeholder='Milestone Description' value={milestone.description} onChange={(event) => updateMilestone(index, 'description', event.target.value)} />
                </div>
              </div>
            ))}
          </div>
          {Object.values(errors).map((error) => (
            <p key={error} className='mt-2 text-xs text-rose-300'>{error}</p>
          ))}
        </div>
      )}

      {step === 3 && (
        <div className='rounded-2xl border border-slate-700 bg-slate-900/60 p-5'>
          <h2 className='mb-4 font-space text-xl text-cyan-100'>Review & Submit</h2>
          <div className='space-y-4 text-sm text-slate-300'>
            <div>
              <p className='font-mono text-xs text-slate-400'>Grant</p>
              <p>{form.title} ({form.category}) - {form.totalAmount} ALGO</p>
              <p>{form.description}</p>
              <p className='font-mono text-xs text-slate-400'>Deadline: {form.deadline}</p>
            </div>
            <div>
              <p className='font-mono text-xs text-slate-400'>Milestones</p>
              <ul className='space-y-2'>
                {form.milestones.map((milestone, index) => (
                  <li key={`review-${index}`} className='rounded border border-slate-800 bg-slate-950/70 p-3'>
                    <p>{milestone.name} - {milestone.amount} ALGO</p>
                    <p className='text-xs text-slate-400'>{milestone.expectedDate} | Proof: {milestone.proofType}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <button onClick={submitGrant} className='mt-5 rounded-lg border border-cyan-300/80 bg-cyan-500/10 px-4 py-2 text-cyan-100 hover:shadow-neon'>
            Deploy Smart Contract
          </button>
        </div>
      )}

      <div className='flex gap-3'>
        {step > 1 && (
          <button onClick={prevStep} className='rounded border border-slate-700 px-4 py-2 text-sm'>
            Back
          </button>
        )}
        {step < 3 && (
          <button onClick={nextStep} className='rounded border border-cyan-400/70 px-4 py-2 text-sm text-cyan-100'>
            Continue
          </button>
        )}
      </div>
    </div>
  )
}
