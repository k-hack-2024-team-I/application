import type { QueryOptions } from '@tanstack/react-query'
import { supabase } from '@/supabase/client'

export function useGetDiaryThumbnailQuery(diaryId: string) {
  return {
    queryKey: ['diary', diaryId, 'thumbnail'],
    queryFn: async () =>
      supabase.storage
        .from('thumbnails')
        .createSignedUrl(diaryId, 60 * 60 * 24)
        .then((response) => response.data?.signedUrl),
  } satisfies QueryOptions
}
