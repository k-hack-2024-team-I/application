import { useMutation } from '@tanstack/react-query'
import { supabase } from '@/supabase/client'

export function useSignInMutation() {
  return useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string
      password: string
    }) =>
      supabase.auth
        .signInWithPassword({
          email,
          password,
        })
        .then(({ data, error }) => {
          if (error) {
            throw error
          }
          return data
        }),
  })
}
