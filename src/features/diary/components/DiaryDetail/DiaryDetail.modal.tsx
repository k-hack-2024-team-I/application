import { ChevronLeftIcon, MenuIcon } from '@channel.io/bezier-icons'
import {
  Box,
  Button,
  HStack,
  Overlay,
  VStack,
  Text,
  Avatar,
  Divider,
} from '@channel.io/bezier-react'
import Image from 'next/image'
import NiceModal, { useModal } from '@ebay/nice-modal-react'
import { useEffect } from 'react'
import { enableBodyScroll, disableBodyScroll } from 'body-scroll-lock'

interface DiaryDetailModalProps {
  userId: string
}

function DiaryDetailModal({ userId }: DiaryDetailModalProps) {
  const { visible, hide } = useModal()

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
        <HStack
          as="header"
          position="sticky"
          align="center"
          justify="between"
          top={0}
          left={0}
          paddingVertical={8}
          paddingHorizontal={16}
          zIndex="floating"
          style={{
            backgroundColor: 'rgba(47, 47, 47)',
          }}
        >
          <Button
            leftContent={ChevronLeftIcon}
            colorVariant="monochrome-dark"
            styleVariant="tertiary"
            onClick={hide}
          />

          <VStack align="center">
            <Text typo="14">user-id</Text>
            <Text
              typo="16"
              bold
            >
              일기
            </Text>
          </VStack>

          {/* TODO(@nabi-chan): 여기에 무엇을 넣으면 좋을지 고민해보기 */}
          <Button
            colorVariant="monochrome-dark"
            styleVariant="tertiary"
          />
        </HStack>

        <VStack spacing={4}>
          {[...Array(10)].map((_, index) => (
            <VStack key={index}>
              <HStack
                align="center"
                justify="between"
                paddingVertical={8}
                paddingHorizontal={16}
              >
                <HStack
                  align="center"
                  spacing={16}
                >
                  <Avatar
                    name="user-profile-pic"
                    size="36"
                  />
                  <Text bold>{userId}</Text>
                </HStack>

                <Button
                  colorVariant="monochrome-dark"
                  styleVariant="tertiary"
                  leftContent={MenuIcon}
                />
              </HStack>

              <Image
                style={{ width: '100%', height: '100%' }}
                src="https://avatars.githubusercontent.com/u/1234?v=4"
                alt="diary-image"
                width={800}
                height={800}
                quality={100}
              />

              <VStack
                spacing={8}
                paddingVertical={16}
                paddingHorizontal={16}
              >
                <Text
                  typo="16"
                  bold
                >
                  {userId}
                </Text>
                <Box>
                  <Text
                    truncated={5}
                    marginBottom={1}
                  >
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Porro animi magnam dolorem eaque optio facilis distinctio
                    iste maiores. Vitae nam eius deleniti voluptate, magnam
                    reiciendis enim nisi quod, odit ea deserunt molestiae magni
                    tempore obcaecati fugiat? Ipsam quos vel laborum laboriosam
                    nemo at, quod exercitationem voluptate, illum similique quas
                    totam esse temporibus harum, iusto necessitatibus eligendi
                    soluta nulla omnis maiores iste voluptatum! Ea, ipsum!
                    Corporis, consequatur, pariatur, eius dolor deserunt sit
                    minima repellendus exercitationem quae hic nulla neque
                    quidem magni nihil quaerat debitis repudiandae explicabo
                    nostrum. Recusandae inventore cumque quisquam id ullam
                    aperiam soluta, quos eligendi incidunt. Veritatis,
                    architecto sit.
                  </Text>
                  <Button
                    colorVariant="monochrome-dark"
                    styleVariant="tertiary"
                    size="xs"
                    text="더보기"
                  />
                </Box>
                <Text
                  typo="14"
                  color="txt-black-dark"
                >
                  2024-12-31 12:34
                </Text>
              </VStack>
              <Divider />
            </VStack>
          ))}
        </VStack>
      </Box>
    </Overlay>
  )
}

export default NiceModal.create(DiaryDetailModal)
