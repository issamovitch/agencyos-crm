// app/components/Sidebar.tsx
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getDictionary } from '@/dictionaries';
import { getModules } from '@/actions/get-modules';
import SidebarClient from './SidebarClient';

const Sidebar = async () => {
  const session = await getServerSession(authOptions);
  if (!session) return null;

  const [modules, dict] = await Promise.all([
    getModules(),
    getDictionary(session.user.userLanguage),
  ]);

  if (!modules || !dict) return null;

  return <SidebarClient modules={modules} dict={dict} />;
};

export default Sidebar;