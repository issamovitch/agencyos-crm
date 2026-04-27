
"use client";

import FulltextSearch from './FulltextSearch';
import AvatarDropdown from './ui/AvatarDropdown';

import { SetLanguage } from '@/components/SetLanguage';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Notifications } from './Notifications';
import { Button } from '@/components/ui/button';
import { Maximize, RefreshCw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import LoadingComponent from '@/components/LoadingComponent';

type Props = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  lang: string;
};

const Header = ({ id, name, email, avatar, lang }: Props) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <>
      {isPending && (
        <div className="fixed inset-0 z-[9999] bg-background/50 backdrop-blur-sm">
          <LoadingComponent />
        </div>
      )}
      <div id="wrapper-header" className="py-3 flex h-16 items-center justify-between space-x-5 border-b px-5 pl-3">
        <div className="flex w-full max-w-sm justify-start">
          <FulltextSearch />
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={handleRefresh}
            title="Refresh"
            disabled={isPending}
          >
            <RefreshCw className={`h-[1.2rem] w-[1.2rem] ${isPending ? 'animate-spin' : ''}`} />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={toggleFullscreen}
            title="Maximize"
          >
            <Maximize className="h-[1.2rem] w-[1.2rem]" />
          </Button>
          <ThemeToggle />
          <Notifications />
          <SetLanguage userId={id} currentLang={lang} />
          <AvatarDropdown avatar={avatar} userId={id} name={name} email={email} />
        </div>
      </div>
    </>
  );
};

export default Header;
