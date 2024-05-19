import type { ReactNode } from 'react'
import { Button, Center, Text, VStack } from '@channel.io/bezier-react'
import { BookCoverIcon } from '@channel.io/bezier-icons'
import Link from 'next/link'
import { BasicLayout } from '@/layout/BasicLayout'

export default function Page() {
  return (
    <Center height="100vh">
      <VStack
        spacing={16}
        maxWidth={300}
        width="100%"
      >
        <Text
          typo="24"
          bold
        >
          AIary
        </Text>
        <Text color="txt-black-darker">쉽고 재미있게 일상을 기록하세요</Text>

        <Link
          href="/auth/sign-up"
          legacyBehavior
        >
          <Button
            size="l"
            colorVariant="monochrome-dark"
            styleVariant="secondary"
            leftContent={BookCoverIcon}
            text="나만의 일기 만들기"
          />
        </Link>

        <Link
          href="/auth/sign-in"
          legacyBehavior
        >
          <Button
            size="s"
            colorVariant="monochrome-dark"
            styleVariant="tertiary"
            text="이미 일기를 만들었나요?"
          />
        </Link>
      </VStack>
    </Center>
  )
}

Page.getLayout = (page: ReactNode) => <BasicLayout>{page}</BasicLayout>
