'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navigation: React.FC = () => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/' && pathname !== '/') return false;
    return pathname.startsWith(path) || pathname === path;
  };

  return (
    <div className='fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-97.5 h-18 rounded-[2.5rem] flex items-center justify-around px-2 glass-morphism shadow-2xl z-50'>
      <Link
        href='/'
        className={`p-3 rounded-2xl transition-all duration-300 ${
          isActive('/')
            ? 'text-white scale-110'
            : 'text-white/30 hover:text-white/60'
        }`}
      >
        <span
          className={`material-symbols-outlined text-2xl ${
            isActive('/') ? 'font-variation-fill' : ''
          }`}
        >
          home
        </span>
      </Link>

      <Link
        href='/analytics'
        className={`p-3 rounded-2xl transition-all duration-300 ${
          isActive('/analytics')
            ? 'text-white scale-110'
            : 'text-white/30 hover:text-white/60'
        }`}
      >
        <span
          className={`material-symbols-outlined text-2xl ${
            isActive('/analytics') ? 'font-variation-fill' : ''
          }`}
        >
          analytics
        </span>
      </Link>

      <div className='relative -top-8'>
        <Link
          href='/add'
          className='size-14 rounded-full bg-white flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.4)] active:scale-90 transition-transform'
        >
          <span className='material-symbols-outlined text-black font-black text-3xl'>
            add
          </span>
        </Link>
      </div>

      <Link
        href='/calendar'
        className={`p-3 rounded-2xl transition-all duration-300 ${
          isActive('/calendar')
            ? 'text-white scale-110'
            : 'text-white/30 hover:text-white/60'
        }`}
      >
        <span
          className={`material-symbols-outlined text-2xl ${
            isActive('/calendar') ? 'font-variation-fill' : ''
          }`}
        >
          calendar_month
        </span>
      </Link>

      <Link
        href='/profile'
        className={`p-3 rounded-2xl transition-all duration-300 ${
          isActive('/profile')
            ? 'text-white scale-110'
            : 'text-white/30 hover:text-white/60'
        }`}
      >
        <span
          className={`material-symbols-outlined text-2xl ${
            isActive('/profile') ? 'font-variation-fill' : ''
          }`}
        >
          person
        </span>
      </Link>
    </div>
  );
};

export default Navigation;
