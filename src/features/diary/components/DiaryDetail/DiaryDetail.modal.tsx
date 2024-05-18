import { Box, Overlay } from '@channel.io/bezier-react'
import NiceModal, { useModal } from '@ebay/nice-modal-react'
import { useEffect } from 'react'
import { enableBodyScroll, disableBodyScroll } from 'body-scroll-lock'
import DiaryDetailList from './DiaryDetailList'
import DiaryDetailHeader from './DiaryDetailHeader'

interface DiaryDetailModalProps {
  userId: string
}

function DiaryDetailModal({ userId }: DiaryDetailModalProps) {
  const { visible } = useModal()

  useEffect(() => {
    disableBodyScroll(document.body)

    return () => {
      enableBodyScroll(document.body)
    }
  }, [])

  return (
    <Overlay
      show={visible}
      withTransition
    >
      <Box
        as="main"
        overflowY="auto"
        height="100vh"
        width="100vw"
        style={{ backgroundColor: 'rgba(47, 47, 47)' }}
      >
        <DiaryDetailHeader userId={userId} />
        <DiaryDetailList userId={userId} />
      </Box>
    </Overlay>
  )
}

export default NiceModal.create(DiaryDetailModal)
