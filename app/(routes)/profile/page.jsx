"use client";

import ButtonSubmit from "@/components/basic-items/ButtonSubmit";
import { useGlobalContext } from "@/context/store";
import changeUserData from "@/server-actions/changeUserData";
import { updateNameForTasks } from "@/server-actions/updateDataAfterChangingUserData";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Profile() {
  const searchParams = useSearchParams();

  const userId = searchParams.get("id");

  const { user } = useGlobalContext();

  const [newName, setNewName] = useState(user?.name);

  const [loading, setLoading] = useState();
  const route = useRouter();

  async function handleChangeData(e) {
    e.preventDefault();

    setLoading(true);
    await changeUserData(userId, { newName });
    await updateNameForTasks({newName});
    route.refresh();
    route.push("/");

    setLoading(false);
  }

  return (
    <div>
      <h1>Hi, {user?.name}</h1>

      <form onSubmit={handleChangeData} className="flex flex-col gap-3">
        <input
          onChange={(e) => setNewName(e.target.value)}
          value={newName}
          className="border border-slate-500 px-8 py-2"
          type="text"
          placeholder="New Name"
        />
        <ButtonSubmit text="Update User Data" loading={loading} />
      </form>
    </div>
  );
}
