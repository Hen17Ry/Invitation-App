export const useDB = () => {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()

  return { supabase, user }
}