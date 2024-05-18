import type { ComponentProps } from 'react'
import { Avatar as BaseAvatar } from '@channel.io/bezier-react'
import { useSignedAvatarUrlQuery } from './useSignedAvatarURLQuery'

export function Avatar({
  avatarUrl: key,
  children,
  ...props
}: ComponentProps<typeof BaseAvatar>) {
  const { data: signedAvatarUrl } = useSignedAvatarUrlQuery(key)

  return (
    <BaseAvatar
      avatarUrl={signedAvatarUrl ?? ''}
      {...props}
    >
      {children}
    </BaseAvatar>
  )
}
