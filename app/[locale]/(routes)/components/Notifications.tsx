'use client';

import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

const notifications = [
  {
    id: '1',
    user: {
      name: 'John Doe',
      avatar: 'https://github.com/shadcn.png',
    },
    content: 'left 6 comments on SOC2 compliance report',
    project: 'Isla Nublar',
    time: '4 min ago',
    unread: true,
  },
  {
    id: '2',
    user: {
      name: 'Thomas William',
      avatar: 'https://github.com/shadcn.png',
    },
    content: '“Oh, I finished de-bugging the phones, but the system\'s compiling for eighteen minutes, or twenty...”',
    time: '8 min ago',
    unread: false,
  },
  {
    id: '3',
    user: {
      name: 'Sarah Anderson',
      avatar: 'https://github.com/shadcn.png',
    },
    content: 'assigned you to a new task',
    project: 'Marketing Campaign',
    time: '12 min ago',
    unread: false,
  },
];

export function Notifications() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-[1.2rem] w-[1.2rem]" />
          <span className="absolute right-2 top-2 flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between border-b px-4 py-2">
          <h4 className="text-sm font-semibold">Notifications</h4>
        </div>
        <ScrollArea className="h-[400px]">
          <div className="flex flex-col">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={cn(
                  'flex items-start gap-3 border-b p-4 transition-colors hover:bg-muted/50',
                  notification.unread && 'bg-primary/5'
                )}
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src={notification.user.avatar} />
                  <AvatarFallback>{notification.user.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1">
                  <p className="text-sm">
                    <span className="font-semibold">{notification.user.name}</span>{' '}
                    <span className="text-muted-foreground">{notification.content}</span>
                    {notification.project && (
                      <>
                        {' '}
                        <span className="font-semibold">{notification.project}</span>
                      </>
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground">{notification.time}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="border-t p-2">
          <Button variant="ghost" className="w-full text-xs" size="sm">
            View all notifications
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
