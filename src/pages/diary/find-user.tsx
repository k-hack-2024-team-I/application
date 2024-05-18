import type { ReactNode } from 'react'
import { Center, Text, VStack } from '@channel.io/bezier-react'
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
          유저 찾기
        </Text>

        <Text>준비중입니다.</Text>
      </VStack>
    </Center>
  )
}

Page.getLayout = (page: ReactNode) => <BasicLayout>{page}</BasicLayout>
