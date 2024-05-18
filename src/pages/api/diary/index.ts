import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '@/supabase/server'
import { generateThumbnail } from '@/features/diary/utils/generateThumbnail'
import type { UserGender } from '@/features/user/constants/constants'

export const config = {
  maxDuration: 300,
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'POST': {
      const { content } = req.body
      const [, accessToken] = req.headers.authorization?.split(' ') ?? []

      const response = await supabase.auth
        .getUser(accessToken)
        .then((response) => response.data.user!)

      if (!response.id) {
        return res.status(401).json({ error: 'Unauthorized' })
      }

      const { path: thumbnailUrl, alt } = await generateThumbnail(
        {
          age: response.user_metadata.age,
          gender: response.user_metadata.gender as UserGender,
        },
        content
      )

      // TODO(@nabi-chan): Implement this
      const mood = '기쁨'

      // TODO(@nabi-chan): Implement this
      const moodScore = 10

      const { data, error } = await supabase
        .from('diary')
        .insert({
          mood,
          content,
          thumbnail_url: thumbnailUrl,
          thumbnail_alt: alt,
          mood_score: moodScore,
          author: response.id,
        })
        .select('id')
        .single()
        .throwOnError()
        .then((response) => response)

      if (!data) {
        console.error(error)
        return res.status(500).json({ error: 'Failed to create a diary' })
      }

      return res.status(200).json({
        id: data.id,
      })
    }

    default: {
      return res.status(405).send('Method is not allowed')
    }
  }
}
