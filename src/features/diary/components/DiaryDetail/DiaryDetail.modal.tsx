import { Box, Overlay } from '@channel.io/bezier-react'
import NiceModal, { useModal } from '@ebay/nice-modal-react'
import { useEffect } from 'react'
import { disableBodyScroll } from 'body-scroll-lock'
import DiaryDetailList from './DiaryDetailList'
import DiaryDetailHeader from './DiaryDetailHeader'

interface DiaryDetailModalProps {
  userId: string
  diaryId?: string
}

function DiaryDetailModal({ userId, diaryId }: DiaryDetailModalProps) {
  const { visible } = useModal()

  useEffect(() => {
    disableBodyScroll(document.body)
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
        <Box
          maxWidth={800}
          marginHorizontal="auto"
        >
          <DiaryDetailHeader userId={userId} />
          <DiaryDetailList
            userId={userId}
            diaryId={diaryId}
          />
        </Box>
      </Box>
    </Overlay>
  )
}

export default NiceModal.create(DiaryDetailModal)
