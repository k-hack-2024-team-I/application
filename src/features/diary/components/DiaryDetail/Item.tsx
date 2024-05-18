import { MenuIcon, TrashIcon } from '@channel.io/bezier-icons'
import {
  VStack,
  HStack,
  Avatar,
  Button,
  Box,
  Divider,
  Text,
  Overlay,
  ListItem,
} from '@channel.io/bezier-react'
import type { UserMetadata } from '@supabase/supabase-js'
import { useRef, useState } from 'react'
import { DiaryThumbnail } from '@/features/diary/components/DiaryThumbnail'
import { useDeleteDiaryMutation } from '@/features/diary/queries/useDeleteDiaryMutation'

interface ItemProps {
  diary: {
    id: string
    content: string | null
    created_at: string | null
    thumbnail_url: string | null
  }
  user: UserMetadata
}

export function Item({ diary, user }: ItemProps) {
  const { mutateAsync } = useDeleteDiaryMutation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuTargetRef = useRef<HTMLButtonElement>(null)

  return (
    <>
      <VStack>
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
            ref={menuTargetRef}
            onClick={() => setIsMenuOpen((prev) => !prev)}
          />
          <Overlay
            show={isMenuOpen}
            withTransition
            container={menuTargetRef.current}
            target={menuTargetRef.current}
            position="bottom-right"
          >
            <Box
              backgroundColor="bg-white-high"
              borderRadius="8"
              padding={8}
              width={200}
            >
              <ListItem
                leftContent={TrashIcon}
                variant="red"
                content="삭제하기"
                onClick={() =>
                  mutateAsync({ diaryId: diary.id, userId: user.id })
                }
              />
            </Box>
          </Overlay>
        </HStack>

        <DiaryThumbnail
          style={{ width: '100%', height: '100%' }}
          imageKey={diary.thumbnail_url!}
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
            <Text style={{ whiteSpace: 'pre-wrap' }}>{diary.content}</Text>
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
    </>
  )
}
