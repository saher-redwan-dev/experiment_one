import connectMongoDB from "@/libs/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function PUT(request) {
  // why the url here printed .../users and not the current url of the page that request comes from!! search for it.
  // const id = request.nextUrl.searchParams.get("id");
  const body = await request.json();
  const { id, newName: name } = body;
  await connectMongoDB();
  await User.findByIdAndUpdate(id, { name });
  return NextResponse.json({ message: "data updated" }, { status: 200 });
}
