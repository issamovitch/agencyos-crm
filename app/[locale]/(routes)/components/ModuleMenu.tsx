'use client';

import type { FC } from 'react';
import React, { useEffect, useState } from 'react';

import ProjectModuleMenu from './menu-items/Projects';
import SecondBrainModuleMenu from './menu-items/SecondBrain';
import InvoicesModuleMenu from './menu-items/Invoices';
import ReportsModuleMenu from './menu-items/Reports';
import DocumentsModuleMenu from './menu-items/Documents';
import ChatGPTModuleMenu from './menu-items/ChatGPT';
import EmployeesModuleMenu from './menu-items/Employees';
import WorkflowsModuleMenu from './menu-items/Workflows';
import DataboxModuleMenu from './menu-items/Databoxes';
import CrmOverviewMenu from './menu-items/CrmOverview';
import CrmAccountsMenu from './menu-items/CrmAccounts';
import CrmContactsMenu from './menu-items/CrmContacts';
import CrmLeadsMenu from './menu-items/CrmLeads';
import CrmOpportunitiesMenu from './menu-items/CrmOpportunities';

import AdministrationMenu from './menu-items/Administration';
import DashboardMenu from './menu-items/Dashboard';
import EmailsModuleMenu from './menu-items/Emails';
import { useSidebarStore } from '@/store/use-sidebar-store';
import type { system_Modules_Enabled } from '@prisma/client';
import type { getDictionary } from '@/dictionaries';

type Props = {
  modules: system_Modules_Enabled[];
  dict: Awaited<ReturnType<typeof getDictionary>>;
};

const ModuleMenu: FC<Props> = ({ modules, dict }) => {
  const { isOpen: open, toggle: toggleOpen } = useSidebarStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div id="wrapper-sidebar" className="flex flex-col">
      <div
        className={` ${
          open ? 'w-72' : 'w-20'
        } relative h-screen p-5 pt-8 duration-300`}
      >
        <div className="flex items-center">
          <div
            className={`flex items-center justify-center cursor-pointer rounded-full border duration-500 ${
              open ? 'p-2' : 'p-1'
            } ${open && 'rotate-[360deg]'}`}
            onClick={toggleOpen}
          >
            <img src="/logo.png" alt="Logo" id="sidebar-logo" className={open ? 'h-10 w-10' : 'h-7 w-7'} />
          </div>

          <h1
            className={`ml-4 origin-left text-xl font-medium duration-200 ${
              !open && 'scale-0'
            }`}
          >
            {process.env.NEXT_PUBLIC_APP_NAME}
          </h1>
        </div>
        <div className="pt-6">
          <DashboardMenu open={open} title={dict.ModuleMenu.dashboard} />
          {modules.find(
            (menuItem) => menuItem.name === 'crm' && menuItem.enabled
          ) ? (
            <>
              <CrmOverviewMenu open={open} title={dict.ModuleMenu.crm.title} />
              <CrmAccountsMenu
                open={open}
                title={dict.ModuleMenu.crm.accounts}
              />
              <CrmContactsMenu
                open={open}
                title={dict.ModuleMenu.crm.contacts}
              />
              <CrmLeadsMenu open={open} title={dict.ModuleMenu.crm.leads} />
              <CrmOpportunitiesMenu
                open={open}
                title={dict.ModuleMenu.crm.opportunities}
              />
            </>
          ) : null}
          {modules.find(
            (menuItem) => menuItem.name === 'projects' && menuItem.enabled
          ) ? (
            <ProjectModuleMenu open={open} title={dict.ModuleMenu.projects} />
          ) : null}
          {modules.find(
            (menuItem) => menuItem.name === 'emails' && menuItem.enabled
          ) ? (
            <EmailsModuleMenu open={open} title={dict.ModuleMenu.emails} />
          ) : null}
          {modules.find(
            (menuItem) => menuItem.name === 'secondBrain' && menuItem.enabled
          ) ? (
            <SecondBrainModuleMenu open={open} />
          ) : null}
          {modules.find(
            (menuItem) => menuItem.name === 'employee' && menuItem.enabled
          ) ? (
            <EmployeesModuleMenu open={open} />
          ) : null}
          {modules.find(
            (menuItem) => menuItem.name === 'invoice' && menuItem.enabled
          ) ? (
            <InvoicesModuleMenu open={open} title={dict.ModuleMenu.invoices} />
          ) : null}
          {modules.find(
            (menuItem) => menuItem.name === 'workflows' && menuItem.enabled
          ) ? (
            <WorkflowsModuleMenu
              open={open}
              //@ts-ignore-next-line
              title={dict.ModuleMenu?.workflows}
            />
          ) : null}
          {modules.find(
            (menuItem) => menuItem.name === 'reports' && menuItem.enabled
          ) ? (
            <ReportsModuleMenu open={open} title={dict.ModuleMenu.reports} />
          ) : null}
          {modules.find(
            (menuItem) => menuItem.name === 'documents' && menuItem.enabled
          ) ? (
            <DocumentsModuleMenu
              open={open}
              title={dict.ModuleMenu.documents}
            />
          ) : null}
          {modules.find(
            (menuItem) => menuItem.name === 'databox' && menuItem.enabled
          ) ? (
            <DataboxModuleMenu open={open} />
          ) : null}
          {modules.find(
            (menuItem) => menuItem.name === 'openai' && menuItem.enabled
          ) ? (
            <ChatGPTModuleMenu open={open} />
          ) : null}
          <AdministrationMenu open={open} title={dict.ModuleMenu.settings} />
        </div>
      </div>

    </div>
  );
};

export default ModuleMenu;
