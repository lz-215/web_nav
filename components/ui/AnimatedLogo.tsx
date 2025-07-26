'use client';

import { cn } from '@/lib/utils';

interface AnimatedLogoProps {
  className?: string;
  size?: number;
  animated?: boolean;
}

export default function AnimatedLogo({ className, size = 64, animated = true }: AnimatedLogoProps) {
  return (
    <div
      className={cn('relative inline-block', animated && 'animate-pulse-light', className)}
      style={{ width: size, height: size }}
    >
      {/* Outer glowing ring */}
      <svg viewBox='0 0 64 64' className='absolute inset-0 h-full w-full'>
        <defs>
          <radialGradient id='logoGlow' cx='50%' cy='50%' r='50%'>
            <stop offset='0%' stopColor='#00F0FF' stopOpacity='0.7' />
            <stop offset='60%' stopColor='#00AAFF' stopOpacity='0.3' />
            <stop offset='100%' stopColor='#8C6CF3' stopOpacity='0.1' />
          </radialGradient>
        </defs>
        <circle cx='32' cy='32' r='30' fill='none' stroke='url(#logoGlow)' strokeWidth='4' />
      </svg>
      {/* Main ring */}
      <svg viewBox='0 0 64 64' className='absolute inset-0 h-full w-full'>
        <defs>
          <linearGradient id='mainRing' x1='0%' y1='0%' x2='100%' y2='100%'>
            <stop offset='0%' stopColor='#8C6CF3' />
            <stop offset='100%' stopColor='#C084FC' />
          </linearGradient>
        </defs>
        <circle cx='32' cy='32' r='22' fill='none' stroke='url(#mainRing)' strokeWidth='6' />
      </svg>
      {/* Abstract AI letters */}
      <svg viewBox='0 0 64 64' className='absolute inset-0 h-full w-full'>
        <g>
          {/* A: left diagonal */}
          <rect x='25' y='22' width='4' height='20' rx='2' fill='#00F0FF' />
          {/* A: right diagonal */}
          <rect x='35' y='22' width='4' height='20' rx='2' fill='#8C6CF3' transform='rotate(20 37 32)' />
          {/* A: crossbar */}
          <rect x='27' y='32' width='10' height='3' rx='1.5' fill='#00AAFF' />
          {/* I: vertical bar */}
          <rect x='44' y='22' width='4' height='20' rx='2' fill='#00F0FF' />
        </g>
      </svg>
      {/* Glow and animation overlays */}
      {animated && (
        <>
          <div className='absolute inset-0 animate-pulse rounded-full bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-transparent blur-md' />
          <div
            className='absolute inset-0 animate-pulse rounded-full bg-gradient-to-br from-cyan-500/10 via-purple-500/5 to-transparent blur-lg'
            style={{ animationDelay: '1s' }}
          />
        </>
      )}
    </div>
  );
}
