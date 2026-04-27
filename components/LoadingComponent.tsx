import { cn } from '@/lib/utils';

interface LoadingComponentProps {
  className?: string;
  fullScreen?: boolean;
}

export default function LoadingComponent({ className, fullScreen = true }: LoadingComponentProps) {
  return (
    <div className={cn(
      "flex w-full items-center justify-center",
      fullScreen ? "h-screen" : "h-full py-10",
      className
    )}>
      <div
        className="h-10 w-10 animate-spin rounded-full border-4 border-solid border-t-transparent"
        style={{ borderColor: '#e41f07', borderTopColor: 'transparent' }}
      />
    </div>
  )
}