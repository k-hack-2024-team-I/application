import type { ComponentProps } from 'react'
import { Suspense } from 'react'
import { useIsMounted } from '@/hooks/useIsMounted'

export function SSRSafeSuspense({
  children,
  fallback,
}: ComponentProps<typeof Suspense>) {
  const mounted = useIsMounted()

  if (mounted) {
    return <Suspense fallback={fallback}>{children}</Suspense>
  }

  return <>{fallback}</>
}
