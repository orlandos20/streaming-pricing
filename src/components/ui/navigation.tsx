import { Screen } from '../../../types';

interface NavigationProps {
  currentScreen: Screen;
  onScreenChange: (screen: Screen) => void;
}

const Navigation: React.FC<NavigationProps> = ({
  currentScreen,
  onScreenChange,
}) => {
  return (
    <div className='fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[390px] h-18 rounded-[2.5rem] flex items-center justify-around px-2 glass-morphism shadow-2xl z-[50]'>
      <button
        onClick={() => onScreenChange('home')}
        className={`p-3 rounded-2xl transition-all duration-300 ${
          currentScreen === 'home'
            ? 'text-white scale-110'
            : 'text-white/30 hover:text-white/60'
        }`}
      >
        <span
          className={`material-symbols-outlined text-2xl ${
            currentScreen === 'home' ? 'font-variation-fill' : ''
          }`}
        >
          home
        </span>
      </button>

      <button
        onClick={() => onScreenChange('analytics')}
        className={`p-3 rounded-2xl transition-all duration-300 ${
          currentScreen === 'analytics'
            ? 'text-white scale-110'
            : 'text-white/30 hover:text-white/60'
        }`}
      >
        <span
          className={`material-symbols-outlined text-2xl ${
            currentScreen === 'analytics' ? 'font-variation-fill' : ''
          }`}
        >
          analytics
        </span>
      </button>

      <div className='relative -top-8'>
        <button className='size-14 rounded-full bg-white flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.4)] active:scale-90 transition-transform'>
          <span className='material-symbols-outlined text-black font-black text-3xl'>
            add
          </span>
        </button>
      </div>

      <button
        onClick={() => onScreenChange('calendar')}
        className={`p-3 rounded-2xl transition-all duration-300 ${
          currentScreen === 'calendar'
            ? 'text-white scale-110'
            : 'text-white/30 hover:text-white/60'
        }`}
      >
        <span
          className={`material-symbols-outlined text-2xl ${
            currentScreen === 'calendar' ? 'font-variation-fill' : ''
          }`}
        >
          calendar_month
        </span>
      </button>

      <button
        onClick={() => onScreenChange('profile')}
        className={`p-3 rounded-2xl transition-all duration-300 ${
          currentScreen === 'profile'
            ? 'text-white scale-110'
            : 'text-white/30 hover:text-white/60'
        }`}
      >
        <span
          className={`material-symbols-outlined text-2xl ${
            currentScreen === 'profile' ? 'font-variation-fill' : ''
          }`}
        >
          person
        </span>
      </button>
    </div>
  );
};

export default Navigation;
