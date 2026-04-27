// app/components/SidebarClient.tsx
'use client';

import {
  Home, BarChart2, FolderKanban, Mail, Brain, Users,
  FileText, GitBranch, FileBarChart, BookOpen,
  Database, MessageSquare, Settings, UserCircle,
  UserPlus, TrendingUp, ChevronLeft,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSidebarStore } from '@/store/use-sidebar-store';
import type { system_Modules_Enabled } from '@prisma/client';
import type { getDictionary } from '@/dictionaries';
import { cn } from '@/lib/utils';

type Dict = Awaited<ReturnType<typeof getDictionary>>;

function NavItem({
                   href,
                   icon: Icon,
                   label,
                   open,
                   match,
                   exact = false,
                 }: {
  href: string;
  icon: LucideIcon;
  label: string;
  open: boolean;
  match: string;
  exact?: boolean;
}) {
  const pathname = usePathname();
  
  const segments = pathname.split('/').filter(Boolean);
  const pathWithoutLocale = segments.length > 0 && segments[0].length === 2
    ? '/' + segments.slice(1).join('/')
    : pathname === '' ? '/' : pathname;

  const active = exact 
    ? pathWithoutLocale === match 
    : pathWithoutLocale.startsWith(match === '/' ? '!!!' : match); 
  
  const finalActive = active;

  return (
    <Link
      href={href}
      className={cn(
        'group flex items-center rounded-lg transition-all duration-200 mb-1',
        open ? 'gap-3 px-3 py-1.5' : 'justify-center py-1.5',
        finalActive
          ? 'bg-primary/10 text-primary'
          : 'text-gray-600 hover:bg-primary/10 hover:text-primary'
      )}
    >
      <div className={cn(
        'flex items-center justify-center rounded-md p-1 transition-colors duration-200',
        finalActive 
          ? 'bg-primary text-white' 
          : 'bg-gray-50 text-gray-600 group-hover:bg-primary group-hover:text-white border border-gray-100'
      )}>
        <Icon className="w-5 h-5" />
      </div>
      <span className={cn(
        'font-medium whitespace-nowrap overflow-hidden transition-all duration-300',
        open ? 'w-auto opacity-100' : 'w-0 opacity-0'
      )}>
        {label}
      </span>
    </Link>
  );
}

type Props = {
  modules: system_Modules_Enabled[];
  dict: Dict;
};

export default function SidebarClient({ modules, dict }: Props) {
  const { isOpen: open, toggle } = useSidebarStore();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const has = (name: string) =>
    modules.some((m) => m.name === name && m.enabled);

  const d = dict.ModuleMenu;

  return (
    <div id="wrapper-sidebar" className="flex flex-col bg-white border-r">
      <div className={cn(
        'relative h-screen transition-all duration-300 ease-in-out flex flex-col',
        open ? 'w-[240px]' : 'w-20'
      )}>

        <div className="flex items-center justify-between px-5 h-16 border-b">
          <div className={cn('flex items-center gap-3 transition-all duration-300', !open && 'justify-center w-full')}>
            <img
              src="/logo.png"
              alt="Logo"
              id="sidebar-logo"
              className={cn(
                "transition-all duration-500 rounded-full", 
                open ? "h-9 w-9 rotate-0" : "h-10 w-10 rotate-[360deg]"
              )}
            />
            <h1 className={cn(
              'origin-left text-xl font-bold uppercase tracking-tight transition-all duration-300',
              open ? 'opacity-100 delay-200' : 'opacity-0 w-0 h-0 overflow-hidden'
            )}>
              {process.env.NEXT_PUBLIC_APP_NAME || 'CRMS'}
            </h1>
          </div>
          <button
            onClick={toggle}
            className={cn(
              'p-1.5 rounded-md hover:bg-gray-100 transition-colors',
              !open && 'absolute -right-3 top-[26px] bg-white border shadow-sm z-50 rounded-full'
            )}
          >
            {open ? (
              <></>
            ) : (
              <ChevronLeft className="w-4 h-4 text-gray-500 rotate-180" />
            )}
          </button>
        </div>

        <div className={cn(
          "flex-1 overflow-y-auto overflow-x-hidden transition-all duration-300 custom-scrollbar",
          open ? "p-4" : "p-3"
        )}>
          <NavItem href="/"               icon={Home}          label={d.dashboard}           open={open} match="/"                    exact />

          {has('crm') && <>
            <NavItem href="/crm"               icon={BarChart2}  label={d.crm.title}         open={open} match="/crm"                  exact />
            <NavItem href="/crm/accounts"      icon={UserCircle} label={d.crm.accounts}      open={open} match="/crm/accounts" />
            <NavItem href="/crm/contacts"      icon={Users}      label={d.crm.contacts}      open={open} match="/crm/contacts" />
            <NavItem href="/crm/leads"         icon={UserPlus}   label={d.crm.leads}         open={open} match="/crm/leads" />
            <NavItem href="/crm/opportunities" icon={TrendingUp} label={d.crm.opportunities} open={open} match="/crm/opportunities" />
          </>}

          {has('projects')    && <NavItem href="/projects"     icon={FolderKanban}  label={d.projects}   open={open} match="/projects" />}
          {has('emails')      && <NavItem href="/emails"       icon={Mail}          label={d.emails}     open={open} match="/emails" />}
          {has('employee')    && <NavItem href="/employees"    icon={Users}         label="Employees"    open={open} match="/employees" />}
          {has('invoice')     && <NavItem href="/invoices"     icon={FileText}      label={d.invoices}   open={open} match="/invoices" />}
          {has('workflows')   && <NavItem href="/workflows"    icon={GitBranch}     label={d.workflows}  open={open} match="/workflows" />}
          {has('reports')     && <NavItem href="/reports"      icon={FileBarChart}  label={d.reports}    open={open} match="/reports" />}
          {has('documents')   && <NavItem href="/documents"    icon={BookOpen}      label={d.documents}  open={open} match="/documents" />}
          {has('databox')     && <NavItem href="/databox"      icon={Database}      label="Databox"      open={open} match="/databox" />}
          {has('openai')      && <NavItem href="/openAi"         icon={MessageSquare} label="AI Chat"      open={open} match="/openAi" />}

          <NavItem href="/admin" icon={Settings} label={d.settings} open={open} match="/admin" />
        </div>
      </div>
    </div>
  );
}