import { TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

type Props = {
  open: boolean;
  title: string;
};

const CrmOpportunitiesMenu = ({ open, title }: Props) => {
  const pathname = usePathname();
  const isPath = pathname.includes('crm/opportunities');

  return (
    <div className="mx-auto flex flex-row items-center p-2">
      <Link
        href={'/crm/opportunities'}
        className={`flex gap-2 p-2 ${isPath ? 'text-muted-foreground' : null}`}
      >
        <TrendingUp className="w-6" />
        <span className={open ? '' : 'hidden'}>{title}</span>
      </Link>
    </div>
  );
};

export default CrmOpportunitiesMenu;
