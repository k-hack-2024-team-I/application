import { Box, Center, Spinner, Text } from '@channel.io/bezier-react'
import NiceModal from '@ebay/nice-modal-react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { DiaryDetailModal } from '@/features/diary/components/DiaryDetail'
import { useGetDiariesQueryObject } from '@/features/diary/queries/useGetDiariesQueryObject'
import { SSRSafeSuspense } from '@/components/SSRSafeSuspense'
import { DiaryThumbnail } from '@/features/diary/components/DiaryThumbnail'

interface ListProps {
  userId: string
}

function List({ userId }: ListProps) {
  const { data } = useSuspenseQuery(useGetDiariesQueryObject(userId))

  if (userId === undefined) {
    return null
  }

  if (data.length === 0) {
    return (
      <Center height={300}>
        <Text color="txt-black-dark">일기가 없습니다 :0...</Text>
      </Center>
    )
  }

  return (
    <Box
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 2,
      }}
    >
      {(data ?? []).map((diary) => (
        <Box
          key={diary.id}
          as="button"
          onClick={() => NiceModal.show(DiaryDetailModal, { userId })}
        >
          <DiaryThumbnail
            style={{
              width: '100%',
              height: '100%',
              aspectRatio: '1 / 1',
            }}
            imageKey={diary.thumbnail_url || '/images/diary_placeholder.png'}
            width={300}
            height={300}
            alt=""
          />
        </Box>
      ))}
    </Box>
  )
}

export default function SuspenseList(props: ListProps) {
  return (
    <SSRSafeSuspense
      fallback={
        <Center height={128}>
          <Spinner color="txt-black-darker" />
        </Center>
      }
    >
      <List {...props} />
    </SSRSafeSuspense>
  )
}
