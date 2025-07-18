'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Moon, Sun } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';

import { NAV_LINKS } from '@/lib/constants';
import { cn } from '@/lib/utils';

import AnimatedLogo from '../ui/AnimatedLogo';
import MenuBtn from './MenuBtn';
import NavigationDrawer from './NavigationDrawer';

export default function Navigation() {
  const t = useTranslations('Navigation');
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const [open, setOpen] = useState(false);

  const NavLinks = NAV_LINKS.map((item) => ({
    ...item,
    label: t(`${item.code}`),
  }));

  return (
    <>
      <header className='sticky left-0 top-0 z-50 flex h-[64px] px-5 transition-all duration-300 lg:px-0'>
        <nav className='mx-auto flex max-w-pc flex-1 items-center'>
          <div>
            <Link className='transition-all duration-200 hover:scale-105 hover:opacity-80' href='/' title={t('title')}>
              <AnimatedLogo size={58} animated className='transition-transform duration-200 lg:size-16' />
            </Link>
          </div>
          {/* pc */}
          <div className='ml-auto flex h-full items-center gap-x-[46px]'>
            <ul className='hidden h-full flex-1 capitalize lg:flex lg:gap-x-12'>
              {NavLinks.map((item) => (
                <Link key={item.code} href={item.href} title={item.code}>
                  <li
                    className={cn(
                      'group relative flex h-full items-center text-gray-100 transition-all duration-200 hover:text-cyan-600',
                      pathname === item.href && 'text-cyan-400',
                      pathname.includes(item.href) && item.href !== '/' && 'text-cyan-400',
                    )}
                  >
                    {item.label}
                    <span className='absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full' />
                  </li>
                </Link>
              ))}
            </ul>
            <div className='flex items-center gap-x-3'>
              {/* <LocaleSwitcher /> */}
              <button
                type='button'
                aria-label='Toggle theme'
                className='rounded-lg p-2 transition-all duration-200 hover:scale-110 hover:bg-white/10 active:scale-95'
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              >
                {theme === 'dark' ? (
                  <Sun className='size-5 text-yellow-400' />
                ) : (
                  <Moon className='size-5 text-blue-500' />
                )}
              </button>
            </div>
          </div>
          {/* mobile */}
          <div className='mx-3 flex items-center gap-x-4 lg:hidden'>
            <MenuBtn open={open} onClick={() => setOpen(!open)} />
          </div>
        </nav>
      </header>
      <NavigationDrawer open={open} setOpen={setOpen} />
    </>
  );
}
