"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, saveUser } from '../lib/auth';

export default function AuthForm() {
  const router = useRouter();
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const user = getCurrentUser();
    if (user) router.replace('/dashboard');
  }, [router]);

  const onSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password || (mode === 'signup' && !name)) {
      setError('Please fill out all fields.');
      return;
    }
    const user = {
      id: Math.random().toString(36).slice(2),
      email,
      name: name || email.split('@')[0],
      createdAt: Date.now(),
    };
    saveUser(user);
    router.push('/dashboard');
  };

  return (
    <div className="max-w-md mx-auto card">
      <div className="card-body">
        <h1 className="text-2xl font-semibold mb-2">
          {mode === 'login' ? 'Welcome back' : 'Create your account'}
        </h1>
        <p className="text-gray-600 mb-6">
          {mode === 'login' ? 'Log in to access your dashboard.' : 'Start generating thumbnails and titles.'}
        </p>
        <form onSubmit={onSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-sm mb-1">Name</label>
              <input value={name} onChange={(e)=>setName(e.target.value)} className="w-full rounded-md border px-3 py-2" placeholder="Your name" />
            </div>
          )}
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full rounded-md border px-3 py-2" placeholder="you@example.com" />
          </div>
          <div>
            <label className="block text-sm mb-1">Password</label>
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full rounded-md border px-3 py-2" placeholder="????????" />
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button className="btn btn-primary w-full" type="submit">
            {mode === 'login' ? 'Log in' : 'Create account'}
          </button>
        </form>
        <div className="mt-4 text-sm text-gray-600">
          {mode === 'login' ? (
            <button className="underline" onClick={()=>setMode('signup')}>Create an account</button>
          ) : (
            <button className="underline" onClick={()=>setMode('login')}>Already have an account? Log in</button>
          )}
        </div>
      </div>
    </div>
  );
}
