import { useSuspenseQueries } from '@tanstack/react-query'
import { MenuIcon } from '@channel.io/bezier-icons'
import {
  VStack,
  HStack,
  Button,
  Box,
  Divider,
  Text,
  Center,
  Spinner,
} from '@channel.io/bezier-react'
import Image from 'next/image'
import { useGetDiariesQueryObject } from '@/features/diary/queries/useGetDiariesQueryObject'
import { SSRSafeSuspense } from '@/components/SSRSafeSuspense'
import { useGetUserQueryObject } from '@/features/user/queries/useGetUserQueryObject'
import { Avatar } from '@/components/Avatar'

interface DiaryDetailProps {
  userId: string
}

export function DiaryDetailList({ userId }: DiaryDetailProps) {
  const [{ data: diarys }, { data: user }] = useSuspenseQueries({
    queries: [useGetDiariesQueryObject(userId), useGetUserQueryObject(userId)],
  })

  return (
    <VStack spacing={4}>
      {diarys.map((diary) => (
        <VStack key={diary.id}>
          <HStack
            align="center"
            justify="between"
            paddingVertical={8}
            paddingHorizontal={16}
          >
            <HStack
              align="center"
              spacing={16}
            >
              <Avatar
                name="user-profile-pic"
                avatarUrl={user.avatarUrl}
                size="36"
              />
              <Text bold>{user.username}</Text>
            </HStack>

            <Button
              colorVariant="monochrome-dark"
              styleVariant="tertiary"
              leftContent={MenuIcon}
            />
          </HStack>

          <Image
            style={{ width: '100%', height: '100%' }}
            src={diary.thumbnail_url || '/images/diary_placeholder.png'}
            alt="diary-image"
            width={800}
            height={800}
            quality={100}
          />

          <VStack
            spacing={8}
            paddingVertical={16}
            paddingHorizontal={16}
          >
            <Text
              typo="16"
              bold
            >
              {user.username}
            </Text>
            <Box>
              <Text
                truncated={5}
                marginBottom={1}
              >
                {diary.content}
              </Text>
            </Box>
            <Text
              typo="14"
              color="txt-black-dark"
            >
              {diary.created_at}
            </Text>
          </VStack>
          <Divider />
        </VStack>
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
