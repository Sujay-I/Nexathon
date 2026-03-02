import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { GraduationCap, ShieldCheck, BookOpen, ArrowRight, LogIn, Sparkles } from 'lucide-react'

const roles = [
    {
        id: 'student',
        label: 'Student',
        icon: GraduationCap,
        description: 'Apply for grants, track milestones, and manage your funded projects.',
        gradient: 'from-blue-500/20 to-blue-700/5',
        borderColor: 'border-blue-400/50',
        hoverBorder: 'hover:border-blue-300',
        hoverShadow: 'hover:shadow-[0_0_30px_rgba(59,130,246,0.25)]',
        iconBg: 'bg-blue-500/15',
        textColor: 'text-blue-300',
        ringColor: 'ring-blue-400/50',
        btnBg: 'bg-blue-500/20 border-blue-400/50 text-blue-200 hover:bg-blue-500/30',
    },
    {
        id: 'admin',
        label: 'Admin',
        icon: ShieldCheck,
        description: 'Oversee all grants, manage approvals, and monitor platform analytics.',
        gradient: 'from-blue-400/20 to-blue-600/5',
        borderColor: 'border-blue-300/50',
        hoverBorder: 'hover:border-blue-200',
        hoverShadow: 'hover:shadow-[0_0_30px_rgba(96,165,250,0.25)]',
        iconBg: 'bg-blue-400/15',
        textColor: 'text-blue-200',
        ringColor: 'ring-blue-300/50',
        btnBg: 'bg-blue-400/20 border-blue-300/50 text-blue-100 hover:bg-blue-400/30',
    },
    {
        id: 'teacher',
        label: 'Teacher',
        icon: BookOpen,
        description: 'Review student proposals, approve milestones, and guide project teams.',
        gradient: 'from-blue-600/20 to-blue-800/5',
        borderColor: 'border-blue-500/50',
        hoverBorder: 'hover:border-blue-400',
        hoverShadow: 'hover:shadow-[0_0_30px_rgba(37,99,235,0.25)]',
        iconBg: 'bg-blue-600/15',
        textColor: 'text-blue-300',
        ringColor: 'ring-blue-500/50',
        btnBg: 'bg-blue-600/20 border-blue-500/50 text-blue-200 hover:bg-blue-600/30',
    },
]

export default function LoginPage() {
    const [selectedRole, setSelectedRole] = useState(null)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [step, setStep] = useState('role') // 'role' | 'credentials'
    const [isLoading, setIsLoading] = useState(false)
    const { login } = useAuth()
    const navigate = useNavigate()

    const activeRole = roles.find((r) => r.id === selectedRole)

    const handleRoleSelect = (roleId) => {
        setSelectedRole(roleId)
    }

    const handleContinue = () => {
        if (selectedRole) setStep('credentials')
    }

    const handleBack = () => {
        setStep('role')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!name.trim() || !email.trim() || !password.trim()) return

        setIsLoading(true)
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1200))
        login(name.trim(), email.trim(), selectedRole)
        setIsLoading(false)
        navigate('/dashboard')
    }

    return (
        <div className='flex min-h-screen flex-col px-4 py-6 lg:px-8'>
            {/* Vitta branding – visible on login page since navbar is hidden */}
            <div className='mb-2'>
                <h2 className='font-space text-2xl font-bold tracking-wide text-blue-300'>Vitta</h2>
            </div>

            <div className='flex flex-1 items-center justify-center'>
                <div className='w-full max-w-2xl'>
                    {/* Header */}
                    <div className='mb-8 text-center'>
                        <div className='mb-3 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5'>
                            <Sparkles size={14} className='text-blue-300' />
                            <span className='font-mono text-xs uppercase tracking-widest text-blue-300'>Secure Access</span>
                        </div>
                        <h1 className='font-space text-3xl font-bold text-white lg:text-4xl'>
                            {step === 'role' ? 'Choose Your Role' : `Sign In as ${activeRole?.label}`}
                        </h1>
                        <p className='mt-2 text-blue-300/60'>
                            {step === 'role'
                                ? 'Select how you want to access the Vitta platform'
                                : 'Enter your credentials to continue'}
                        </p>
                    </div>

                    {/* Role Selection Step */}
                    {step === 'role' && (
                        <div className='space-y-6'>
                            <div className='grid gap-4 md:grid-cols-3'>
                                {roles.map((role) => {
                                    const Icon = role.icon
                                    const isSelected = selectedRole === role.id
                                    return (
                                        <button
                                            key={role.id}
                                            id={`role-${role.id}`}
                                            onClick={() => handleRoleSelect(role.id)}
                                            className={`group relative overflow-hidden rounded-2xl border bg-gradient-to-br p-5 text-left transition-all duration-300 ${role.gradient} ${isSelected
                                                ? `${role.borderColor} ring-2 ${role.ringColor} scale-[1.02]`
                                                : `border-blue-800/40 ${role.hoverBorder} ${role.hoverShadow}`
                                                }`}
                                        >
                                            {/* Selection indicator */}
                                            {isSelected && (
                                                <div className='absolute right-3 top-3'>
                                                    <div className={`h-3 w-3 rounded-full ${role.iconBg} ring-2 ${role.ringColor}`}>
                                                        <div className={`h-full w-full rounded-full ${role.textColor} animate-pulse`} />
                                                    </div>
                                                </div>
                                            )}

                                            <div className={`mb-3 inline-flex rounded-xl p-2.5 ${role.iconBg}`}>
                                                <Icon size={22} className={role.textColor} />
                                            </div>
                                            <h3 className={`font-space text-lg font-semibold ${isSelected ? role.textColor : 'text-white'}`}>
                                                {role.label}
                                            </h3>
                                            <p className='mt-1.5 text-sm leading-relaxed text-blue-300/50'>{role.description}</p>

                                            {/* Bottom glow on hover */}
                                            <div
                                                className={`absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-transparent via-blue-400/60 to-transparent transition-opacity duration-300 ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'
                                                    }`}
                                            />
                                        </button>
                                    )
                                })}
                            </div>

                            <div className='flex justify-center'>
                                <button
                                    id='continue-btn'
                                    onClick={handleContinue}
                                    disabled={!selectedRole}
                                    className={`inline-flex items-center gap-2 rounded-xl px-8 py-3 font-space text-sm font-medium transition-all duration-300 ${selectedRole
                                        ? `${activeRole.btnBg} border cursor-pointer`
                                        : 'cursor-not-allowed border border-blue-800/30 bg-blue-900/20 text-blue-500/40'
                                        }`}
                                >
                                    Continue
                                    <ArrowRight size={16} />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Credentials Step */}
                    {step === 'credentials' && activeRole && (
                        <div className='mx-auto max-w-md'>
                            <div
                                className={`overflow-hidden rounded-2xl border bg-gradient-to-br ${activeRole.gradient} ${activeRole.borderColor} p-6`}
                            >
                                {/* Role indicator */}
                                <div className='mb-6 flex items-center gap-3'>
                                    <div className={`rounded-xl p-2 ${activeRole.iconBg}`}>
                                        <activeRole.icon size={20} className={activeRole.textColor} />
                                    </div>
                                    <div>
                                        <p className={`font-space text-sm font-medium ${activeRole.textColor}`}>{activeRole.label} Login</p>
                                        <p className='text-xs text-blue-300/50'>{activeRole.description}</p>
                                    </div>
                                </div>

                                <form onSubmit={handleSubmit} className='space-y-4'>
                                    <div>
                                        <label htmlFor='name' className='mb-1.5 block text-sm text-blue-200/80'>
                                            Full Name
                                        </label>
                                        <input
                                            id='name'
                                            type='text'
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder='Enter your full name'
                                            required
                                            className='w-full rounded-lg border border-blue-700/40 bg-[#060e24] px-4 py-2.5 text-sm text-white placeholder-blue-400/30 outline-none transition focus:border-blue-400/60 focus:ring-1 focus:ring-blue-400/30'
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor='email' className='mb-1.5 block text-sm text-blue-200/80'>
                                            Email Address
                                        </label>
                                        <input
                                            id='email'
                                            type='email'
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder='you@university.edu'
                                            required
                                            className='w-full rounded-lg border border-blue-700/40 bg-[#060e24] px-4 py-2.5 text-sm text-white placeholder-blue-400/30 outline-none transition focus:border-blue-400/60 focus:ring-1 focus:ring-blue-400/30'
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor='password' className='mb-1.5 block text-sm text-blue-200/80'>
                                            Password
                                        </label>
                                        <input
                                            id='password'
                                            type='password'
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder='••••••••'
                                            required
                                            className='w-full rounded-lg border border-blue-700/40 bg-[#060e24] px-4 py-2.5 text-sm text-white placeholder-blue-400/30 outline-none transition focus:border-blue-400/60 focus:ring-1 focus:ring-blue-400/30'
                                        />
                                    </div>

                                    <div className='flex items-center gap-3 pt-2'>
                                        <button
                                            type='button'
                                            id='back-btn'
                                            onClick={handleBack}
                                            className='rounded-lg border border-blue-700/40 px-4 py-2.5 text-sm text-blue-300/70 transition hover:border-blue-500/40 hover:text-blue-200'
                                        >
                                            Back
                                        </button>
                                        <button
                                            type='submit'
                                            id='login-btn'
                                            disabled={isLoading || !name.trim() || !email.trim() || !password.trim()}
                                            className={`flex flex-1 items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-all duration-300 ${activeRole.btnBg} disabled:cursor-not-allowed disabled:opacity-50`}
                                        >
                                            {isLoading ? (
                                                <>
                                                    <div className='h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent' />
                                                    Signing in...
                                                </>
                                            ) : (
                                                <>
                                                    <LogIn size={16} />
                                                    Sign In
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>

                            {/* Demo hint */}
                            <p className='mt-4 text-center text-xs text-blue-400/40'>
                                Demo mode — enter any credentials to sign in
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
