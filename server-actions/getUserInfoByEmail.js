"use server";

import useFetch_server from "@/components/custom-hooks/useFetch_server";

export default async function getUserInfoByEmail(email) {
  const { data } = await useFetch_server(
    "POST",
    "http://localhost:3000/api/findUserByEmail",
    {
      email,
    }
  );
  console.log("DATA::::::", data);
  delete data?.password;
  return data;
}
