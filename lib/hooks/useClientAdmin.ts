import { useEffect, useState } from "react";
import useSupabaseOnClient from "./useSupabaseOnClient";

export default function useClientAdmin() {
  'use client'
  const supabase = useSupabaseOnClient()
  const [isAdmin, setIsAdmin] = useState(false)
  useEffect(() => {
    async function checkAdmin() {
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      if (userError) {
        console.error(userError)
        setIsAdmin(false)
      }

      const { data, error: queryError } = await supabase
        .from('Users')
        .select('isAdmin')
        .eq('id', user?.id!)
        .limit(1)
        .single()
      if (queryError) {
        console.error(queryError)
        setIsAdmin(false)
      }
      setIsAdmin(Boolean(data?.isAdmin))
    }
    checkAdmin()
  }, [supabase])
  return isAdmin
}
