import { Suspense } from 'react';

import SuspenseLoading from '@/components/loadings/suspense';

import Container from '../../components/ui/Container';
import OpportunitiesView from '../components/OpportunitiesView';
import { getAllCrmData } from '@/actions/crm/get-crm-data';
import { getOpportunitiesFull } from '@/actions/crm/get-opportunities-with-includes';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Opportunities',
};

const OpportunitiesPage = async () => {
  const crmData = await getAllCrmData();
  const opportunities = await getOpportunitiesFull();

  return (
    <Container
      title="Opportunities"
      description={'Everything you need to know about your accounts'}
    >
      <Suspense fallback={<SuspenseLoading />}>
        <OpportunitiesView crmData={crmData} data={opportunities} />
      </Suspense>
    </Container>
  );
};

export default OpportunitiesPage;
