import Image from 'next/image'
import type { ComponentProps } from 'react'

interface DiaryThumbnailProps
  extends Omit<ComponentProps<typeof Image>, 'src'> {
  imageKey: string
}

export function DiaryThumbnail({
  imageKey: key,
  ...props
}: DiaryThumbnailProps) {
  const prefix = `https://hfokuhoievsxeyuxtzkv.supabase.co/storage/v1/object/public/thumbnails`

  return (
    <Image
      src={`${prefix}/${key}`}
      {...props}
    />
  )
}
