import type { ComponentProps } from 'react'
import { Avatar as BaseAvatar } from '@channel.io/bezier-react'

export function Avatar({
  avatarUrl: key,
  children,
  ...props
}: ComponentProps<typeof BaseAvatar>) {
  const prefix = `https://hfokuhoievsxeyuxtzkv.supabase.co/storage/v1/object/public/avatars`

  return (
    <BaseAvatar
      avatarUrl={`${prefix}/${key}`}
      {...props}
    >
      {children}
    </BaseAvatar>
  )
}
