import { getServerSession } from 'next-auth';

import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';

import Header from './components/Header';
import SideBar from './components/SideBar';
import type { Metadata } from 'next';
import NextTopLoader from 'nextjs-toploader'

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL! || 'http://localhost:3000'
  ),
  description: '',
  openGraph: {
    images: [
      {
        url: '/images/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: '',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: [
      {
        url: '/images/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: '',
      },
    ],
  },
};
export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  //console.log(session, "session");

  if (!session) {
    return redirect('/sign-in');
  }

  const user = session?.user;

  if (user?.userStatus === 'PENDING') {
    return redirect('/pending');
  }

  if (user?.userStatus === 'INACTIVE') {
    return redirect('/inactive');
  }

  //console.log(typeof build, "build");
  return (
    <div className="flex h-screen overflow-hidden">
      <NextTopLoader color="#e41f07" height={4} />
      <SideBar />
      <div id="wrapper-container" className="flex h-full w-full flex-col overflow-hidden">
        <Header
          id={session.user.id as string}
          name={session.user.name as string}
          email={session.user.email as string}
          avatar={session.user.image as string}
          lang={session.user.userLanguage as string}
        />
        <div className="h-full flex-grow overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
