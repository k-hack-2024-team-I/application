import { Box } from '@channel.io/bezier-react'
import type { PropsWithChildren } from 'react'

export function BasicLayout({ children }: PropsWithChildren) {
  return (
    <Box
      maxWidth={800}
      width="100%"
      marginHorizontal="auto"
    >
      {children}
    </Box>
  )
}
