import type { PropsWithChildren } from 'react'
import { Button, HStack, Text, VStack } from '@channel.io/bezier-react'
import { ChevronLeftIcon } from '@channel.io/bezier-icons'
import Link from 'next/link'
import { BasicLayout } from '@/layout/BasicLayout'

interface PageLayoutProps {
  title: string
  description?: string

  backLink?: string
}

export function PageLayout({
  title,
  description,

  backLink,

  children,
}: PropsWithChildren<PageLayoutProps>) {
  return (
    <BasicLayout>
      <HStack
        spacing={4}
        padding={16}
      >
        {backLink && (
          <Link
            href={backLink}
            legacyBehavior
          >
            <Button
              leftContent={ChevronLeftIcon}
              colorVariant="monochrome-dark"
              styleVariant="tertiary"
            />
          </Link>
        )}
        <VStack spacing={4}>
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
      </HStack>
      {children}
    </BasicLayout>
  )
}
