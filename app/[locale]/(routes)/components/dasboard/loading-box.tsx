import LoadingComponent from '@/components/LoadingComponent';
import { Card } from '@/components/ui/card';

const LoadingBox = () => (
  <Card className="flex items-center justify-center p-6">
    <LoadingComponent fullScreen={false} className="py-0" />
  </Card>
);

export default LoadingBox;
