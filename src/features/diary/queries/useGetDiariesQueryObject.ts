import type { QueryOptions } from '@tanstack/react-query'
import { supabase } from '@/supabase/client'

export function useGetDiariesQueryObject(userId: string) {
  return {
    queryKey: ['diary', userId],
    queryFn: async () =>
      supabase
        .from('diary')
        .select('id, content, created_at, thumbnail_url, thumbnail_alt, music')
        .eq('author', userId!)
        .order('created_at', { ascending: false })
        .throwOnError()
        .then((res) => res.data ?? []),
  } satisfies QueryOptions
}
