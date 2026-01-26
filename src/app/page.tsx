import Dashboard from '@/components/ui/dashboard';
import Navigation from '@/components/ui/navigation';
import { PlatformApiRepository } from './infrastructure/api/platformApiRepository';
import { GetPlatforms } from './application/use-cases/get-platforms';
import DashboardHeader from '@/components/ui/dashboard-header';
import {
  StreamingProvider,
  // SUPPORTED_COUNTRIES,
} from './application/contexts/streaming-context';
import { UserProvider } from './application/contexts/user-context';
import { UserApiRepository } from './infrastructure/api/user/UserApiRepository';
import { GetUser } from './application/use-cases/user/get-user';

// const exampleUser = {
//   userId: new UserId('user-123'),
//   name: new UserName('Orlando Jimenez'),
//   country: SUPPORTED_COUNTRIES[0],
//   currency: {
//     code: SUPPORTED_COUNTRIES[0]?.currency?.code || 'EUR',
//     symbol: SUPPORTED_COUNTRIES[0]?.currency?.symbol || '€',
//     icon: SUPPORTED_COUNTRIES[0]?.currency?.icon,
//     name: SUPPORTED_COUNTRIES[0]?.currency?.name || 'Euro',
//   },
//   userSubscriptions: [
//     new UserSubscription(
//       'sub-001',
//       new UserId('user-123'),
//       new PlatformId('platform-001'),
//       new SubscriptionPlanId('plan-001'),
//       new Money(9.99, {
//         code: SUPPORTED_COUNTRIES[0]?.currency?.code || 'EUR',
//         symbol: SUPPORTED_COUNTRIES[0]?.currency?.symbol || '€',
//         icon: SUPPORTED_COUNTRIES[0]?.currency?.icon,
//         name: SUPPORTED_COUNTRIES[0]?.currency?.name || 'Euro',
//       }),
//       new SharedPeople(1),
//     ),
//   ],
// };

// const spain = SUPPORTED_COUNTRIES[0];

// const exampleUserFromApi = {
//   id: 'user-1',
//   name: 'Orlando Jimenez',
//   currency: {
//     code: spain?.currency?.code || 'EUR',
//     symbol: spain?.currency?.symbol || '€',
//     icon: spain?.currency?.icon,
//     name: spain?.currency?.name || 'Euro',
//   },
//   country: spain || {
//     countryName: 'Spain',
//     countryIcon: '🇪🇸',
//     countryCode: 'ES',
//   },
//   userSubscriptions: [
//     {
//       subscriptionId: 'sub-001',
//       userId: 'user-123',
//       platformId: 'platform-001',
//       subscriptionPlanId: 'plan-001',
//       price: 9.99,
//       peopleSharedWith: 1,
//     },
//   ],
// };

export default async function Home() {
  const userRepo = new UserApiRepository();
  const getUserUseCase = new GetUser(userRepo);
  const userFromApi = await getUserUseCase.execute('user-1');

  const repo = new PlatformApiRepository();
  const platformUseCase = new GetPlatforms(repo);
  const platforms = await platformUseCase.execute();

  return (
    <UserProvider user={userFromApi}>
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
                  userName={userFromApi?.name || 'Guest'}
                />
                <Dashboard />
                <Navigation />
              </div>
            </div>
          </div>
        </main>
      </StreamingProvider>
    </UserProvider>
  );
}
