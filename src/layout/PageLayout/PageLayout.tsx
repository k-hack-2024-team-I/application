import type { PropsWithChildren } from 'react'
import { Text, VStack } from '@channel.io/bezier-react'
import { BasicLayout } from '@/layout/BasicLayout'

interface PageLayoutProps {
  title: string
  description?: string
}

export function PageLayout({
  title,
  description,

  children,
}: PropsWithChildren<PageLayoutProps>) {
  return (
    <BasicLayout>
      <VStack
        spacing={4}
        padding={16}
      >
        <Text
          typo="24"
          bold
        >
          {title}
        </Text>
        {description && (
          <Text
            typo="14"
            color="txt-black-darker"
          >
            {description}
          </Text>
        )}
      </VStack>
      {children}
    </BasicLayout>
  )
}
