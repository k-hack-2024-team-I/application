import type { NextApiRequest, NextApiResponse } from 'next'
import { assert } from 'console'
import { supabase } from '@/supabase/server'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET': {
      const userId = req.query['user-id'] as string
      assert(typeof userId === 'string', 'userId must be a valid string')

      const { data } = await supabase.auth.admin.getUserById(userId)
      if (!data.user) {
        return res.status(404).json({ error: 'User not found' })
      }

      const { username, avatar_url, description, gender } =
        data.user.user_metadata

      const avatarUrl = supabase.storage
        .from('avatars')
        .getPublicUrl(avatar_url)

      return res.status(200).json({
        avatarUrl,
        username,
        description,
        gender,
      })
    }

    default: {
      return res.status(405).send('Method is not allowed')
    }
  }
}
