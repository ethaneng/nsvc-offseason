/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import useSupabaseOnClient from "@/lib/hooks/useSupabaseOnClient";
import { MailCheck, MailWarning } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function page() {
  const router = useRouter();
  const supabase = useSupabaseOnClient();
  const params = useSearchParams();

  const [isSuccess, setSuccess] = useState(false);

  useEffect(() => {
    async function confirmEmail() {
      const code = params.get("code");

      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (error) {
          console.error(error);
          setSuccess(false);
        } else {
          setSuccess(true);
        }
        setTimeout(() => {
          router.replace("/");
        }, 5000);
      } else {
        router.replace("/");
      }
    }
    confirmEmail();
  }, [params, router, supabase]);

  return (
    <Alert className={!isSuccess ? "border-destructive" : ""}>
      {isSuccess ? (
        <>
          <MailCheck className="h-4 w-4" />
          <AlertTitle>Email Confirmed</AlertTitle>
          <AlertDescription>
            Thanks for confirming your email. You can now login to register for
            events. You will be redirected shortly.
          </AlertDescription>
        </>
      ) : (
        <>
          <MailWarning className="h-4 w-4 text-destructive" />
          <AlertTitle>Could Not Confirm Email</AlertTitle>
          <AlertDescription>
            Something went wrong confirming your email. Please try again later.
          </AlertDescription>
        </>
      )}
    </Alert>
  );
}

export default page;
