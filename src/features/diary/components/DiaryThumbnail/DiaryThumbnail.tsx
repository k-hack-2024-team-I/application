import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import type { ComponentProps } from 'react'
import { Center, Spinner } from '@channel.io/bezier-react'
import { useGetDiaryThumbnailQuery } from './useGetDiaryThumbnailQuery'

interface DiaryThumbnailProps
  extends Omit<ComponentProps<typeof Image>, 'src'> {
  imageKey: string
}

export function DiaryThumbnail({
  imageKey: key,
  ...props
}: DiaryThumbnailProps) {
  const { data: src } = useQuery(useGetDiaryThumbnailQuery(key))

  if (!src) {
    return (
      <Center
        height="100%"
        width="100%"
        style={{ aspectRatio: '1 / 1' }}
      >
        <Spinner color="txt-black-dark" />
      </Center>
    )
  }

  return (
    <Image
      src={src}
      {...props}
    />
  )
}
