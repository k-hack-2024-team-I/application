import { Box, Overlay } from '@channel.io/bezier-react'
import NiceModal, { useModal } from '@ebay/nice-modal-react'
import { useEffect } from 'react'
import { disableBodyScroll } from 'body-scroll-lock'
import { useRouter } from 'next/router'
import DiaryDetailList from './DiaryDetailList'
import DiaryDetailHeader from './DiaryDetailHeader'

interface DiaryDetailModalProps {
  userId: string
  diaryId?: string
}

function DiaryDetailModal({ userId, diaryId }: DiaryDetailModalProps) {
  const { visible, hide } = useModal()
  const { beforePopState } = useRouter()

  useEffect(
    function closeModalBeforePopState() {
      beforePopState(() => {
        hide()
        return false
      })
    },
    [hide, beforePopState]
  )

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
