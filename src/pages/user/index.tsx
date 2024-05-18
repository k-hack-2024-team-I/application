import type { ReactNode } from 'react'
import { VStack } from '@channel.io/bezier-react'
import { PageLayout } from '@/layout/PageLayout'
import { ChangePasswordForm } from '@/features/user/components/ChangePasswordForm/ChangePasswordForm'

export default function Page() {
  return (
    <VStack
      spacing={24}
      height="100%"
      paddingHorizontal={16}
      paddingBottom={32}
    >
      <ChangePasswordForm />
    </VStack>
  )
}

Page.getLayout = (page: ReactNode) => (
  <PageLayout
    title="유저 정보 수정하기"
    description="나에 관한 정보를 여기서 수정해보아요"
  >
    {page}
  </PageLayout>
)
