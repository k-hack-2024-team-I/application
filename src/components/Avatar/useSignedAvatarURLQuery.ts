import { useQuery } from '@tanstack/react-query'
import { isEmpty } from 'lodash-es'
import { supabase } from '@/supabase/client'

export function useSignedAvatarUrlQuery(key?: string) {
  return useQuery({
    queryKey: ['avatar_url', key],
    queryFn: async () =>
      supabase.storage
        .from('avatars')
        .createSignedUrl(key!, 60 * 60 * 24 * 7)
        .then((response) => response.data?.signedUrl ?? null),
    enabled: !isEmpty(key),
  })
}
