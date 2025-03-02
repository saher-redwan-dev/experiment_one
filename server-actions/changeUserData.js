"use server";

import useFetch_server from "@/components/custom-hooks/useFetch_server";

export default async function changeUserData(id, newData) {
  const { data: res } = await useFetch_server(
    "PUT",
    "http://localhost:3000/api/users",
    { id, ...newData }
  );
  console.log("res:::::", res);

  // console.log("cookies().get('user')", cookies());



  // try {
  //   const res = await fetch(url, {
  //     method: "PUT",
  //     headers: {
  //       "Content-type": "application/json",
  //     },
  //     body: JSON.stringify(sentData),
  //   });

  //   if (res.ok) {
  //     data = await res.json();
  //   }
  // } catch (error) {
  //   console.log("Error_POST: ", error);
  //   throw new Error("Error_POST");
  // }
}
