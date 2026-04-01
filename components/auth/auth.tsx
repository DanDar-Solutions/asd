"use client";
import { useState } from 'react'
import { createClient } from '../../lib/supabase/client'


export default function Auth({ onAuthSuccess }: { onAuthSuccess: (user: any) => void }) {

    const [mode, setMode] = useState('signin') // 'signin' | 'signup'
    const [userId, setUserId] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [signUpSuccess, setSignUpSuccess] = useState(false)
    const supabase = createClient()
    const resetForm = () => {
        setUserId('')
        setPassword('')
        setConfirmPassword('')
        setError(null)
    }

    const switchMode = (newMode: string) => {
        resetForm()
        setMode(newMode)
    }

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const { data, error: fetchError } = await supabase
            .from('demo_users')
            .select('*')
            .eq('user_id', userId)
            .eq('password', password)
            .maybeSingle()

        if (fetchError) {
            setError('Something went wrong. Please try again.')
        } else if (!data) {
            setError('Invalid user ID or password.')
        } else {
            onAuthSuccess(data)
        }

        setLoading(false)
    }

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        if (password !== confirmPassword) {
            setError('Passwords do not match.')
            setLoading(false)
            return
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters.')
            setLoading(false)
            return
        }

        // Check if user_id already exists
        const { data: existing } = await supabase
            .from('demo_users')
            .select('user_id')
            .eq('user_id', userId)
            .maybeSingle()

        if (existing) {
            setError('This user ID is already taken. Please choose another.')
            setLoading(false)
            return
        }

        const { data: newUser, error: insertError } = await supabase
            .from('demo_users')
            .insert([{ user_id: userId, password }])
            .select()
            .single()

        if (insertError) {
            setError('Failed to create account. Please try again.')
        } else {
            setSignUpSuccess(true)
        }


        setLoading(false)
    }

    if (signUpSuccess) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#f5f3ee] p-4 font-serif">
                <div className="bg-white rounded-[16px] border border-[#e8e3da] p-10 px-8 w-full max-w-[400px] flex flex-col">
                    <div className="w-12 h-12 rounded-full bg-[#eaf3de] text-[#3b6d11] text-xl flex items-center justify-center mx-auto mb-4 font-semibold">✓</div>
                    <h2 className="text-[22px] font-semibold text-[#1a1714] text-center mb-2">Account created!</h2>
                    <p className="text-[14px] text-[#3d3830] text-center leading-relaxed mb-5">
                        Your account <strong>{userId}</strong> has been created successfully.
                    </p>
                    <button
                        onClick={() => onAuthSuccess({ user_id: userId, password })}
                        className="bg-[#2c2620] text-white border-none rounded-lg p-3 text-[15px] font-medium cursor-pointer transition-opacity mt-1 hover:opacity-90"
                    >
                        Continue →
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f5f3ee] p-4 font-serif">
            <div className="bg-white rounded-[16px] border border-[#e8e3da] p-10 px-8 w-full max-w-[400px] flex flex-col">
                <h1 className="text-[24px] font-semibold text-[#1a1714] m-0 mb-1 text-center tracking-tight">Student Portal</h1>
                <p className="text-[14px] text-[#7a7268] text-center m-0 mb-6">
                    {mode === 'signin' ? 'Sign in to your account' : 'Create a new account'}
                </p>

                {/* Tab switcher */}
                <div className="flex bg-[#f5f3ee] rounded-lg p-1 mb-6">
                    <button
                        className={`flex-1 border-none bg-transparent p-2 rounded-md text-[14px] cursor-pointer transition-all ${mode === 'signin' ? 'bg-white text-[#1a1714] font-medium shadow-[0_1px_3px_rgba(0,0,0,0.08)]' : 'text-[#7a7268]'}`}
                        onClick={() => switchMode('signin')}
                    >
                        Sign in
                    </button>
                    <button
                        className={`flex-1 border-none bg-transparent p-2 rounded-md text-[14px] cursor-pointer transition-all ${mode === 'signup' ? 'bg-white text-[#1a1714] font-medium shadow-[0_1px_3px_rgba(0,0,0,0.08)]' : 'text-[#7a7268]'}`}
                        onClick={() => switchMode('signup')}
                    >
                        Sign up
                    </button>
                </div>

                <form onSubmit={mode === 'signin' ? handleSignIn : handleSignUp} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[13px] font-medium text-[#3d3830]">User ID</label>
                        <input
                            type="text"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            placeholder="Enter your user ID"
                            required
                            className="p-2.5 px-3.5 rounded-lg border border-[#ddd8cf] text-[15px] text-[#1a1714] bg-[#fafaf8] outline-none transition-colors focus:border-gray-400 font-sans"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-[13px] font-medium text-[#3d3830]">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                            className="p-2.5 px-3.5 rounded-lg border border-[#ddd8cf] text-[15px] text-[#1a1714] bg-[#fafaf8] outline-none transition-colors focus:border-gray-400 font-sans"
                        />
                    </div>

                    {mode === 'signup' && (
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[13px] font-medium text-[#3d3830]">Confirm password</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Re-enter your password"
                                required
                                className="p-2.5 px-3.5 rounded-lg border border-[#ddd8cf] text-[15px] text-[#1a1714] bg-[#fafaf8] outline-none transition-colors focus:border-gray-400 font-sans"
                            />
                        </div>
                    )}

                    {error && <p className="text-[13px] text-[#c0392b] bg-[#fdf0ee] border border-[#f5c6c0] rounded-lg p-2.5 px-3 m-0">{error}</p>}

                    <button type="submit" disabled={loading} className="bg-[#2c2620] text-white border-none rounded-lg p-2.5 text-[15px] font-medium cursor-pointer mt-1 transition-opacity disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center relative hover:opacity-90 min-h-[44px]">
                        {loading ? <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-[spin_1s_linear_infinite] absolute" /> : mode === 'signin' ? 'Sign in' : 'Create account'}
                    </button>
                </form>

                <p className="text-[13px] text-[#7a7268] text-center mt-5">
                    {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
                    <button
                        type="button"
                        onClick={() => switchMode(mode === 'signin' ? 'signup' : 'signin')}
                        className="bg-transparent border-none text-[#2c2620] text-[13px] font-semibold cursor-pointer p-0 underline hover:text-black"
                    >
                        {mode === 'signin' ? 'Sign up' : 'Sign in'}
                    </button>
                </p>
            </div>
        </div>
    )

}
