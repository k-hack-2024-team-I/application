import { useSuspenseQueries } from '@tanstack/react-query'
import { VStack, Center, Spinner } from '@channel.io/bezier-react'
import { useEffect } from 'react'
import { useGetDiariesQueryObject } from '@/features/diary/queries/useGetDiariesQueryObject'
import { SSRSafeSuspense } from '@/components/SSRSafeSuspense'
import { useGetUserQueryObject } from '@/features/user/queries/useGetUserQueryObject'
import { Item } from './Item'

interface DiaryDetailProps {
  userId: string
  diaryId?: string
}

export function DiaryDetailList({ userId, diaryId }: DiaryDetailProps) {
  const [{ data: diarys }, { data: user }] = useSuspenseQueries({
    queries: [useGetDiariesQueryObject(userId), useGetUserQueryObject(userId)],
  })

  useEffect(() => {
    if (diaryId) {
      const target = document.getElementById(`diary-${diaryId}`)
      target?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [diaryId])

  return (
    <VStack spacing={4}>
      {diarys.map((diary) => (
        <Item
          key={diary.id}
          diary={diary}
          user={user}
        />
      ))}
    </VStack>
  )
}

export default function SuspenseDiaryDetailList(props: DiaryDetailProps) {
  return (
    <SSRSafeSuspense
      fallback={
        <Center height="100%">
          <Spinner color="txt-black-dark" />
        </Center>
      }
    >
      <DiaryDetailList {...props} />
    </SSRSafeSuspense>
  )
}
