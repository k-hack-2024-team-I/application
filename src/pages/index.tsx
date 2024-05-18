import type { ReactNode } from 'react'
import { BasicLayout } from '@/layout/BasicLayout'

export default function Page() {
  return <div>Hello, World!</div>
}

Page.getLayout = (page: ReactNode) => <BasicLayout>{page}</BasicLayout>
