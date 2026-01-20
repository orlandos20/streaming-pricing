import { Subscription } from '../../../types';

interface DashboardProps {
  subscriptions: Subscription[];
  totalMonthly: string;
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  onSelectSub: (id: string) => void;
}

const CATEGORIES = ['All', 'Music', 'Video', 'Cloud', 'SaaS'];

const Dashboard: React.FC<DashboardProps> = ({
  subscriptions,
  totalMonthly,
  activeCategory,
  setActiveCategory,
  onSelectSub,
}) => {
  return (
    <div className='flex flex-col pb-32'>
      {/* Header */}
      <div className='sticky top-0 z-40 bg-transparent backdrop-blur-md p-6 pt-12 flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <div
            className='w-10 h-10 rounded-full border border-white/20 bg-center bg-cover shadow-lg'
            style={{
              backgroundImage: 'url("https://picsum.photos/seed/alex/100/100")',
            }}
          ></div>
          <div>
            <p className='text-[10px] uppercase tracking-widest text-white/40 font-bold'>
              Welcome back
            </p>
            <p className='text-sm font-semibold text-white/90'>
              Orlando Jimenez
            </p>
          </div>
        </div>
        <button className='flex items-center justify-center rounded-full h-10 w-10 bg-white/5 border border-white/10 text-white/70 active:scale-90 transition-transform'>
          <span className='material-symbols-outlined'>add</span>
        </button>
      </div>

      {/* Summary Card */}
      <div className='px-6 mt-4'>
        <div className='glass-morphism rounded-[2.5rem] p-8 relative overflow-hidden group'>
          <div className='absolute -top-20 -right-20 w-48 h-48 bg-blue-500/10 blur-[80px] group-hover:bg-blue-500/20 transition-all'></div>

          <p className='text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] mb-2'>
            Total Monthly Spend
          </p>
          <div className='flex items-baseline gap-2 mb-6'>
            <span className='text-white/40 text-2xl font-light'>$</span>
            <h1 className='glass-text text-5xl font-extrabold tracking-tight'>
              {totalMonthly}
            </h1>
            <span className='text-white/30 text-xs font-bold uppercase tracking-widest ml-1'>
              USD
            </span>
          </div>

          <div className='flex items-center justify-between'>
            <div className='flex flex-col'>
              <p className='text-white/30 text-[10px] uppercase font-bold tracking-wider mb-1'>
                Next Renewal
              </p>
              <p className='text-white/90 text-sm font-semibold tracking-wide'>
                March 15, 2024
              </p>
            </div>
            <button className='h-10 px-6 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-[10px] text-white/80 font-bold uppercase tracking-widest transition-all backdrop-blur-md'>
              Analytics
            </button>
          </div>

          <div className='mt-8 h-1.5 w-full bg-white/5 rounded-full overflow-hidden'>
            <div className='h-full bg-linear-to-r from-blue-400 via-indigo-500 to-purple-600 w-[68%] shadow-[0_0_20px_rgba(96,165,250,0.5)]'></div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className='px-4 mt-8'>
        <div className='flex gap-2 overflow-x-auto no-scrollbar py-2'>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all whitespace-nowrap border ${
                activeCategory === cat
                  ? 'bg-white/20 border-white/30 text-white'
                  : 'bg-white/5 border-transparent text-white/40 hover:text-white/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Active Plans List */}
      <div className='px-6 mt-8 flex items-center justify-between mb-4'>
        <h3 className='text-white/80 text-[11px] font-black uppercase tracking-[0.2em]'>
          Active Services
        </h3>
        <span className='text-[10px] font-bold text-white/20 uppercase tracking-widest'>
          {subscriptions.length} Total
        </span>
      </div>

      <div className='px-4 flex flex-col gap-3'>
        {subscriptions.map((sub) => (
          <div
            key={sub.id}
            onClick={() => onSelectSub(sub.id)}
            className='glass-morphism group flex items-center p-4 rounded-3xl transition-all active:scale-[0.98] cursor-pointer hover:bg-white/8'
          >
            <div
              className={`size-14 rounded-2xl flex items-center justify-center relative shadow-inner border border-white/5 ${sub.color}/20`}
            >
              {sub.iconType === 'letter' ? (
                <span
                  className={`text-xl font-black ${sub.color.replace(
                    'bg-',
                    'text-',
                  )}`}
                >
                  {sub.iconValue}
                </span>
              ) : (
                <span
                  className={`material-symbols-outlined text-3xl font-light ${sub.color.replace(
                    'bg-',
                    'text-',
                  )}`}
                >
                  {sub.iconValue}
                </span>
              )}
              <div
                className={`absolute inset-0 blur-xl opacity-20 rounded-full ${sub.color}`}
              ></div>
            </div>

            <div className='ml-4 flex-1'>
              <p className='text-white text-sm font-bold tracking-wide'>
                {sub.name}
              </p>
              <p className='text-white/40 text-[11px] font-medium tracking-tight'>
                ${sub.price}/mo •{' '}
                <span className={sub.daysLeft < 5 ? 'text-orange-400/80' : ''}>
                  {sub.daysLeft} days left
                </span>
              </p>
            </div>

            <div className='bg-white/5 h-9 w-9 rounded-full flex items-center justify-center border border-white/10 group-hover:bg-white/10 transition-all'>
              <span className='material-symbols-outlined text-white/30 group-hover:text-white/60 text-lg'>
                chevron_right
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
