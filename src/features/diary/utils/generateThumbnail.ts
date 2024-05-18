import assert from 'assert'
import { openai } from '@/utils/openai'
import { supabase } from '@/supabase/server'
import type { UserGender } from '@/features/user/constants/constants'
import { UserGenderLabels } from '@/features/user/constants/constants'

const getPrompt = (
  context: { age: number; gender: UserGender },
  content: string
) => `다음 조건에 맞는 그림을 그려주세요.
- 어린아이가 그린것처럼 단순하고 귀엽게 그려주세요.
- 그림의 스타일은 크레용으로 그린것처럼 그려주세요.
- 겉에 크레용을 그리지 않아도 됩니다.
- 이 말을 하는 화자는 ${context.age}세이며, 성별은 ${UserGenderLabels[context.gender]}입니다.
- 글자를 쓰지 말아주세요.

상황은 다음과 같습니다.
${content}
`

export async function generateThumbnail(
  context: { age: number; gender: UserGender },
  content: string
) {
  const { data } = await openai.images.generate({
    model: 'dall-e-3',
    prompt: getPrompt(context, content),
    size: '1024x1024',
    response_format: 'b64_json',
  })

  assert(data[0].b64_json, 'Failed to generate a thumbnail')
  const path = await supabase.storage
    .from('thumbnails')
    .upload(`${+Date.now()}.png`, Buffer.from(data[0].b64_json, 'base64'), {
      contentType: 'image/png',
    })
    .then((response) => response.data?.path)

  return {
    path,
    alt: data[0].revised_prompt,
  }
}
