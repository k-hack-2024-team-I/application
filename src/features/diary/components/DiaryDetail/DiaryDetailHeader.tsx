import { ChevronLeftIcon } from '@channel.io/bezier-icons'
import { HStack, Button, VStack, Text, Box } from '@channel.io/bezier-react'
import { useModal } from '@ebay/nice-modal-react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { enableBodyScroll } from 'body-scroll-lock'
import { SSRSafeSuspense } from '@/components/SSRSafeSuspense'
import { useGetUserQueryObject } from '@/features/user/queries/useGetUserQueryObject'

interface DiaryDetailHeaderProps {
  userId: string
}

export function DiaryDetailHeader({ userId }: DiaryDetailHeaderProps) {
  const { hide } = useModal()
  const { data } = useSuspenseQuery(useGetUserQueryObject(userId))

  return (
    <HStack
      as="header"
      position="sticky"
      align="center"
      justify="between"
      top={0}
      left={0}
      paddingVertical={8}
      paddingHorizontal={16}
      zIndex="important"
      style={{
        backgroundColor: 'rgba(47, 47, 47)',
      }}
    >
      <Button
        leftContent={ChevronLeftIcon}
        colorVariant="monochrome-dark"
        styleVariant="tertiary"
        onClick={() => {
          hide()
          enableBodyScroll(document.body)
        }}
      />

      <VStack align="center">
        <Text typo="14">{data.username}</Text>
        <Text
          typo="16"
          bold
        >
          일기
        </Text>
      </VStack>

      {/* TODO(@nabi-chan): 여기에 무엇을 넣으면 좋을지 고민해보기 */}
      <Button
        colorVariant="monochrome-dark"
        styleVariant="tertiary"
      />
    </HStack>
  )
}

export default function SuspenseDiaryDetailHeader(
  props: DiaryDetailHeaderProps
) {
  const { hide } = useModal()

  return (
    <SSRSafeSuspense
      fallback={
        <Box
          paddingVertical={8}
          paddingHorizontal={16}
        >
          <Button
            leftContent={ChevronLeftIcon}
            colorVariant="monochrome-dark"
            styleVariant="tertiary"
            onClick={() => {
              hide()
              enableBodyScroll(document.body)
            }}
          />
        </Box>
      }
    >
      <DiaryDetailHeader {...props} />
    </SSRSafeSuspense>
  )
}
