import { Users } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

type Props = {
  open: boolean;
  title: string;
};

const CrmContactsMenu = ({ open, title }: Props) => {
  const pathname = usePathname();
  const isPath = pathname.includes('crm/contacts');

  return (
    <div className="mx-auto flex flex-row items-center p-2">
      <Link
        href={'/crm/contacts'}
        className={`flex gap-2 p-2 ${isPath ? 'text-muted-foreground' : null}`}
      >
        <Users className="w-6" />
        <span className={open ? '' : 'hidden'}>{title}</span>
      </Link>
    </div>
  );
};

export default CrmContactsMenu;
