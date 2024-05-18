import { EditIcon, TrashIcon, UploadIcon } from '@channel.io/bezier-icons'
import { Button, ListItem, Overlay, VStack } from '@channel.io/bezier-react'
import { useRef, useState } from 'react'
import assert from 'assert'
import { supabase } from '@/supabase/client'
import { Avatar } from '@/components/Avatar'

interface AvatarUploaderProps {
  avatarUrl: string
  onUploadSuccess: (url: string) => void
}

export function AvatarUploader({
  avatarUrl: _avatarUrl,
  onUploadSuccess,
}: AvatarUploaderProps) {
  const [displayAvatarUploaderOverlay, setDisplayAvatarUploaderOverlay] =
    useState(false)
  const [avatarUrl, setAvatarUrl] = useState(_avatarUrl)

  const avatarRef = useRef<HTMLDivElement>(null)
  const avatarUploadButtonRef = useRef<HTMLButtonElement>(null)

  const handleUploadImage = () => {
    const element = document.createElement('input')
    element.type = 'file'
    element.accept = 'image/*'
    element.click()
    element.onchange = async (event) => {
      const { files } = event.target as HTMLInputElement
      if (!files || files.length === 0) {
        return
      }

      const response = await supabase.storage
        .from('avatars')
        .upload(`${+Date.now()}-${files[0].name}`, files[0])

      assert(response.data?.path, 'Failed to upload image')
      setDisplayAvatarUploaderOverlay(false)
      onUploadSuccess(response.data.path)
      setAvatarUrl(response.data.path)
    }
  }

  return (
    <>
      <Avatar
        name="avatar url"
        size="90"
        avatarUrl={avatarUrl}
      >
        <div ref={avatarRef}>
          <Button
            size="s"
            leftContent={EditIcon}
            colorVariant="monochrome-dark"
            ref={avatarUploadButtonRef}
            onClick={() => setDisplayAvatarUploaderOverlay((p) => !p)}
          />
        </div>
      </Avatar>
      <Overlay
        show={displayAvatarUploaderOverlay}
        withTransition
        target={avatarUploadButtonRef.current}
        container={avatarRef.current}
        marginY={4}
        position="bottom-left"
      >
        <VStack
          padding={8}
          width={170}
          borderRadius="8"
          backgroundColor="bg-white-high"
        >
          <ListItem
            onClick={handleUploadImage}
            leftContent={UploadIcon}
            content="이미지 업로드하기"
          />
          <ListItem
            variant="red"
            leftContent={TrashIcon}
            content="이미지 삭제하기"
          />
        </VStack>
      </Overlay>
    </>
  )
}
