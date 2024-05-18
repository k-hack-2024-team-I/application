import language from '@google-cloud/language'
import { GoogleAuth } from 'google-auth-library'
import { openai } from '@/utils/openai'
import type { UserGender } from '@/features/user/constants/constants'

export async function getUserMood(
  context: { gender: UserGender; age: number },
  content: string
) {
  const client = new language.LanguageServiceClient({
    auth: new GoogleAuth({
      credentials: {
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        project_id: process.env.GOOGLE_PROJECT_ID,
        private_key: process.env.GOOGLE_PRIVATE_KEY,
      },
    }),
  })

  const [result] = await client.analyzeSentiment({
    document: { type: 'PLAIN_TEXT', content },
  })

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-2024-05-13',
    messages: [
      {
        role: 'system',
        content: `화자의 현재 감정 상태만을 반환하세요.
- 예를들어 화자가 분노에 빠진 상황에 경우, '분노' 를 반환해야 합니다.
- 이 말을 하는 화자는 ${context.age}세이며, 성별은 ${context.gender}입니다.
- 현재 시간은 ${Date.now()} 입니다.`,
      },
      {
        role: 'user',
        content,
      },
    ],
  })

  const mood = response.choices[0].message.content
  const score = ((result.documentSentiment?.score ?? 0) + 1) * 5

  return {
    mood,
    score,
  }
}
