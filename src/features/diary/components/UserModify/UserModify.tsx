import { Box, ButtonGroup, Button } from '@channel.io/bezier-react'
import { useSuspenseQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useGetThisUserQueryObject } from '@/features/user/queries/useGetThisUserQueryObject'
import { SSRSafeSuspense } from '@/components/SSRSafeSuspense'

interface UserModifyProps {
  userId: string
}

export function UserModify({ userId }: UserModifyProps) {
  const { data } = useSuspenseQuery(useGetThisUserQueryObject())

  if (data?.id !== userId) {
    return <></>
  }

  return (
    <Box
      paddingTop={16}
      paddingHorizontal={16}
    >
      <ButtonGroup justify="start">
        <Link
          href="/user"
          legacyBehavior
        >
          <Button
            style={{ flex: 1 }}
            styleVariant="secondary"
            colorVariant="monochrome-dark"
            text="프로필 수정하기"
          />
        </Link>
      </ButtonGroup>
    </Box>
  )
}

export default function SuspenseUserModify(props: UserModifyProps) {
  return (
    <SSRSafeSuspense fallback={<></>}>
      <UserModify {...props} />
    </SSRSafeSuspense>
  )
}
