"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const UserForm = () => {
  const { data: session } = useSession();
  const [isRenderThePage, setIsRenderThePage] = useState(false);

  useEffect(() => {
    // not allow this page when loggedin.
    setIsRenderThePage(true);
    if (session?.user?.email) {
      window.location = "/";
    }
  });

  const router = useRouter();
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    const res = await fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify({
        formData: {
          ...formData,
          SignUp_provider: "Credentials",
        },
      }),
      "content-type": "application/json",
    });

    if (!res.ok) {
      const response = await res.json();
      setErrorMessage(response.message);
    } else {
      router.refresh();
      router.push("/signin");
    }
  };

  return (
    <>
      {isRenderThePage && !session?.user?.email ? (
        <>
          <form
            onSubmit={handleSubmit}
            method="post"
            className="flex flex-col gap-3 w-1/2 items-center justify-center mt-8"
          >
            <h1 className="font-bold text-3xl">SignUp</h1>
            <label>Full Name</label>
            <input
              id="name"
              name="name"
              type="text"
              onChange={handleChange}
              required={true}
              value={formData.name}
              className="m-2 bg-slate-400 rounded"
            />
            <label>Email</label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={handleChange}
              required={true}
              value={formData.email}
              className="m-2 bg-slate-400 rounded"
            />
            <label>Password</label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={handleChange}
              required={true}
              value={formData.password}
              className="m-2 bg-slate-400 rounded"
            />
            <input
              type="submit"
              value="Create User"
              className="bg-blue-300 hover:bg-blue-100"
            />
          </form>
          <p className="text-red-500">{errorMessage}</p>
          <hr />
          <button
            type="button"
            onClick={() => signIn("google")}
            className="bg-slate-400 p-2 m-4"
          >
            SignIn with Google
          </button>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default UserForm;
