import React, { Suspense } from 'react';

import AccountsView from '../components/AccountsView';
import Container from '../../components/ui/Container';
import SuspenseLoading from '@/components/loadings/suspense';
import { getAllCrmData } from '@/actions/crm/get-crm-data';
import { getAccounts } from '@/actions/crm/get-accounts';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Accounts',
};

const AccountsPage = async () => {
  const crmData = await getAllCrmData();
  const accounts = await getAccounts();

  return (
    <Container
      title="Accounts"
    >
      <Suspense fallback={<SuspenseLoading />}>
        <AccountsView crmData={crmData} data={accounts} />
      </Suspense>
    </Container>
  );
};

export default AccountsPage;
