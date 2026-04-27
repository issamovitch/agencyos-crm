import { Suspense } from 'react';

import SuspenseLoading from '@/components/loadings/suspense';

import Container from '../../components/ui/Container';
import LeadsView from '../components/LeadsView';

import { getAllCrmData } from '@/actions/crm/get-crm-data';
import { getLeads } from '@/actions/crm/get-leads';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Leads',
};

const LeadsPage = async () => {
  const crmData = await getAllCrmData();
  const leads = await getLeads();
  return (
    <Container
      title="Leads"
      description={'Everything you need to know about your leads'}
    >
      <Suspense fallback={<SuspenseLoading />}>
        <LeadsView crmData={crmData} data={leads} />
      </Suspense>
    </Container>
  );
};

export default LeadsPage;
