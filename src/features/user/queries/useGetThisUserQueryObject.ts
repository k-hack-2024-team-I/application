import type { QueryOptions } from '@tanstack/react-query'
import { supabase } from '@/supabase/client'

export function useGetThisUserQueryObject() {
  return {
    queryKey: ['user', 'this'],
    queryFn: async () => supabase.auth.getUser().then((res) => res.data.user),
  } satisfies QueryOptions
}
