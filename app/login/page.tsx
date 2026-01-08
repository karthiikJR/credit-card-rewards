'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import BackButton from '../components/BackButton';
import { NeoPopInput, NeoPopButton, NeoPopSelect } from '../components/custom';

export default function LoginPage() {
  const router = useRouter();
  const [authMode, setAuthMode] = useState<'password' | 'otp'>('otp'); 
  const [loading, setLoading] = useState(false);
  
  const [otpMethod, setOtpMethod] = useState<'email' | 'phone'>('email');
  const [countryCode, setCountryCode] = useState('+91');
  
  // OTP Flow State
  const [otpSent, setOtpSent] = useState(false);
  const [otpValue, setOtpValue] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    if (authMode === 'otp') {
      if (!otpSent) {
        // Send OTP
        setTimeout(() => {
            setOtpSent(true);
            setLoading(false);
        }, 1000);
      } else {
        // Verify OTP
        setTimeout(() => {
            setLoading(false);
            router.push('/');
        }, 1000);
      }
    } else {
       // Password Login
       setTimeout(() => {
        setLoading(false);
        router.push('/');
      }, 1500);
    }
  };

  const resetFlow = () => {
      setOtpSent(false);
      setOtpValue('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#080808] p-5 relative overflow-hidden">
      {/* Background Grid Effect */}
      <div className="absolute inset-0 pointer-events-none" 
           style={{
             backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
             backgroundSize: '40px 40px'
           }}
      />

      <div className="absolute top-8 left-8 z-20">
        <BackButton />
      </div>

      <div className="w-full max-w-[420px] bg-[#1C1C1C] border border-[#333333] shadow-[12px_12px_0px_rgba(0,0,0,0.5)] relative z-10 flex flex-col animate-[slideUp_0.5s_cubic-bezier(0.16,1,0.3,1)]">
        <div className="pt-8 px-8 text-center">
          <div className="text-2xl font-black uppercase tracking-[2px] text-white mb-2">CRED REWARDS</div>
          <div className="text-[#B3B3B3] text-[13px] uppercase tracking-[1px]">Select your preferred access method</div>
        </div>

        <div className="flex mt-8 border-b border-[#333333]">
          <NeoPopButton 
            variant="tab"
            active={authMode === 'otp'}
            className={`flex-1 p-4 border-b-2 ${authMode === 'otp' ? 'border-white bg-white/[0.05]' : 'border-transparent hover:bg-white/[0.02]'} ${otpSent ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => { if(!otpSent) { setAuthMode('otp'); resetFlow(); } }}
            disabled={otpSent}
          >
            OTP Login
          </NeoPopButton>
          <NeoPopButton 
            variant="tab"
            active={authMode === 'password'}
            className={`flex-1 p-4 border-b-2 ${authMode === 'password' ? 'border-white bg-white/[0.05]' : 'border-transparent hover:bg-white/[0.02]'} ${otpSent ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => { if(!otpSent) { setAuthMode('password'); resetFlow(); } }}
            disabled={otpSent}
          >
            Password
          </NeoPopButton>
        </div>

        <form className="p-8 flex flex-col gap-6" onSubmit={handleLogin}>
          {authMode === 'otp' ? (
            <>
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                    <label className="text-[#B3B3B3] text-[11px] font-bold uppercase tracking-[1.5px]">
                        {otpMethod === 'email' ? 'Email Address' : 'Mobile Number'}
                    </label>
                    
                    {!otpSent && (
                        <button 
                            type="button"
                            onClick={() => setOtpMethod(otpMethod === 'email' ? 'phone' : 'email')}
                            className="bg-none border-none text-white text-[11px] cursor-pointer underline p-0 uppercase font-bold"
                        >
                            {otpMethod === 'email' ? 'Login using mobile number' : 'Login using email'}
                        </button>
                    )}
                </div>

                {otpMethod === 'email' ? (
                  <NeoPopInput
                    type="email" 
                    className={otpSent ? 'opacity-50 !bg-[#111]' : ''}
                    placeholder="name@example.com"
                    required 
                    disabled={otpSent}
                  />
                ) : (
                  <div className="flex gap-3">
                    <div className="flex-none w-[100px] z-10">
                        <NeoPopSelect 
                            options={['+91', '+1', '+44', '+81']}
                            value={countryCode}
                            onChange={setCountryCode}
                        />
                    </div>
                    <NeoPopInput
                      type="tel" 
                      className={`flex-1 ${otpSent ? 'opacity-50 !bg-[#111]' : ''}`}
                      placeholder="9876543210"
                      required 
                      disabled={otpSent}
                    />
                  </div>
                )}
              </div>
              
              {otpSent && (
                  <div className="flex flex-col gap-3 animate-[fadeIn_0.5s_ease]">
                    <label className="text-[#B3B3B3] text-[11px] font-bold uppercase tracking-[1.5px]">Enter 6-digit OTP</label>
                    <NeoPopInput
                      type="text" 
                      className="tracking-[8px] text-center font-bold"
                      placeholder="• • • • • •"
                      maxLength={6}
                      required 
                      value={otpValue}
                      onChange={(e) => setOtpValue(e.target.value)}
                      autoFocus
                    />
                  </div>
              )}

              {!otpSent && (
                  <p className="text-xs text-[#666] -mt-3">
                    We'll send a one-time password to this {otpMethod}.
                  </p>
              )}
            </>
          ) : (
            <>
              <div className="flex flex-col gap-3">
                <label className="text-[#B3B3B3] text-[11px] font-bold uppercase tracking-[1.5px]">Email Address</label>
                <NeoPopInput
                  type="email" 
                  placeholder="name@example.com"
                  required 
                />
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-[#B3B3B3] text-[11px] font-bold uppercase tracking-[1.5px]">Password</label>
                <NeoPopInput
                  type="password" 
                  placeholder="••••••••"
                  required 
                />
              </div>
            </>
          )}

          <NeoPopButton
            type="submit" 
            variant="primary"
            className="w-full p-[18px] text-base font-extrabold tracking-[2px] mt-2"
          >
            {loading ? 'Processing...' : (authMode === 'otp' && !otpSent ? 'Get OTP' : 'Verify & Login')}
          </NeoPopButton>
          
          <div className="text-center mt-4">
             <Link href="#" className="text-[#666] text-xs no-underline">
               Trouble signing in?
             </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
