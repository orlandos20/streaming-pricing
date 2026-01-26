import Dashboard from '@/components/ui/dashboard';
import Navigation from '@/components/ui/navigation';
import { PlatformApiRepository } from './infrastructure/api/platformApiRepository';
import { GetPlatforms } from './application/use-cases/get-platforms';
import DashboardHeader from '@/components/ui/dashboard-header';
import { StreamingProvider } from './application/contexts/streaming-context';

export default async function Home() {
  const repo = new PlatformApiRepository();
  const platformUseCase = new GetPlatforms(repo);
  const platforms = await platformUseCase.execute();

  return (
    <StreamingProvider platforms={platforms}>
      <main className='flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black'>
        <div className='min-h-screen w-full items-center justify-between md:py-10 xs:py-6 px-6 bg-white dark:bg-black'>
          <div className='relative min-h-screen w-full flex flex-col overflow-x-hidden'>
            {/* Background Blobs */}
            <div className='liquid-blob w-125 h-125 bg-purple-900/60 -top-40 -left-20 animate-pulse-slow'></div>
            <div className='liquid-blob w-100 h-100 bg-blue-900/40 top-1/2 -right-20 opacity-40'></div>
            <div className='liquid-blob w-75 h-75 bg-indigo-900/30 bottom-0 left-1/4 opacity-30'></div>

            {/* Main Content Area */}
            <div className='relative z-10 flex flex-col w-full max-w-107.5 mx-auto min-h-screen bg-black/20 backdrop-blur-[2px] shadow-2xl'>
              <DashboardHeader
                backgroundImage='https://picsum.photos/seed/alex/100/100'
                userName='Orlando Jimenez'
              />
              <Dashboard />
              <Navigation />
            </div>
          </div>
        </div>
      </main>
    </StreamingProvider>
  );
}
