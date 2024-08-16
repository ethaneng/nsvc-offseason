import useSupabaseOnServer from "./useSupabaseOnServer";

export default async function useServerAdmin() {
  const supabase = useSupabaseOnServer()
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error) {
    console.error(error)
    return false
  }

  const { data, error: queryError } = await supabase
    .from('Users')
    .select('isAdmin')
    .eq('id', user?.id!)
    .limit(1)
    .single()

  if (queryError) {
    console.error(queryError)
    return false
  }
  return Boolean(data?.isAdmin)
}

