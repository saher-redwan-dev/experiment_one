"use server";

import Task from "@/models/task";
import { getServerSession } from "next-auth";

export async function updateNameForTasks({ newName }) {
  // now we will just dealing with name filed...
  const session = await getServerSession();

  console.log("session.user.name::::", session.user.name);

  const res = await Task.updateMany(
    { email: session.user.email },
    { publisher: newName }
  );
}
