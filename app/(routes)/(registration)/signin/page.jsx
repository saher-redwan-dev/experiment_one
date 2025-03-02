"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";

export default function SignIn() {
  const { data: session } = useSession();
  const [isRenderThePage, setIsRenderThePage] = useState(false);

  useEffect(() => {
    // not allow this page when loggedin.
    setIsRenderThePage(true);
    if (session?.user?.email) {
      window.location = "/";
    }
  });

  const emailRef = useRef();
  const passwordRef = useRef();

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  async function handleSubmit(e) {
    e.preventDefault();

    await signIn("credentials", {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      // redirect to prev page that user need.
      callbackUrl,
    });
  }

  return (
    <>
      {isRenderThePage && !session?.user?.email ? (
        <>
          <form onSubmit={handleSubmit}>
            <label>
              Email
              <input name="email" type="email" required ref={emailRef} />
            </label>
            <label>
              Password
              <input
                name="password"
                type="password"
                required
                ref={passwordRef}
              />
            </label>
            <button type="submit">Sign In</button>
            <hr className="mt-3" />
            <hr />
            <hr />
          </form>
          <div>
            <button
              type="button"
              onClick={async () => await signIn("google")}
              className="bg-slate-400 p-2 m-4"
            >
              SignIn with Google
            </button>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
}
