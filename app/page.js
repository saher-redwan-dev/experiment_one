import ClientComponent from "@/components/ClientComponent";
import ServerComponent from "@/components/ServerComponent";
import Link from "next/link";
import { Suspense } from "react";

export default async function Home() {
  try {
    // await new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve();
    //   }, 1);
    // });
  } catch (error) {
    console.error("Error updating tasks::::", error.message);
  }

  return (
    <main>
      <div className="text-5xl">Home</div>
      <Link
        href="/addSomthing"
        className="border border-1 border-[#999] p-3 my-4 block w-fit"
      >
        Add Somthing Page
      </Link>
      <div className="flex gap-4">
        {/* <Suspense fallback={"laoding... server"}> */}
        <ServerComponent />
        {/* </Suspense> */}
        {/* <Suspense fallback={"laoding... client"}> */}
        <ClientComponent />
        {/* </Suspense> */}
      </div>
    </main>
  );
}
