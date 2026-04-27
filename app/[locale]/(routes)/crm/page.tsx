import { Suspense } from 'react';
import type { Metadata } from 'next';
import Container from '../components/ui/Container';
import MainPageView from './components/MainPageView';
import SuspenseLoading from '@/components/loadings/suspense';

export const metadata: Metadata = {
  title: 'Overview',
};

const CrmPage = async () => (
  <Container
    title="Overview"
    description={'Everything you need to know about sales'}
  >
    {/*
      TODO: Think about how to handle the loading of the data to make better UX with suspense
      */}
    <Suspense fallback={<SuspenseLoading />}>
      <MainPageView />
    </Suspense>
  </Container>
);

export default CrmPage;
