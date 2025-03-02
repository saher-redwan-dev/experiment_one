"use client";

import { useRouter } from "next/navigation";
import ButtonSubmit from "@/components/basic-items/ButtonSubmit";
import useFetch_server from "@/components/custom-hooks/useFetch_server";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/context/store";
import Link from "next/link";

export default function AddSomthing() {
  // const [loading, setLoading] = useState(false);
  // here an important note you can keek the loading useState because the submit button can be pressable for a little while (some ms), then send more inappropriate requests.

  const { user } = useGlobalContext();

  console.log(user);

  const router = useRouter();
  // const { data: session } = useSession();

  const schema = z.object({
    // email: z.string().email(),
    title: z.string().endsWith("."),
    description: z.string().min(4),
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      // title: "title...",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    // setLoading(true)
    // const { data: data_fetch } = await useFetch_server(
    //   "POST",
    //   "http://localhost:3000/api/tasks",
    //   {
    //     title: data.title,
    //     description: data.description,
    //     publisher: session?.user?.name || session?.user?.email,
    //     email: session?.user?.email,
    //     // image: null,
    //     userImage: session?.user?.image || null,
    //   }
    // );
    // console.log("data_fetch:::", data_fetch);
    // if (data_fetch) {
    //   router.push("/");
    //   router.refresh();
    // } else {
    //   // alert("Wrong...");
    //   setError("root", {
    //     // for ex: (this usually for data comes from server)
    //     // message: "This email is already taken",
    //     message: "Error in server..., sorry",
    //   });
    // }
    // setLoading(true);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-3 p-10"
    >
      <Link
        href="/"
        className="border border-1 border-[#999] p-3 my-4 block w-fit"
      >
        Back Home
      </Link>

      <div className="my-6 w-[8rem] h-[8rem] bg-slate-500 " data-aos="fade-up"></div>


      <div className="italic uppercase ">Hi, {user?.name || user?.email}</div>

      <input
        {...register("title")}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Task Title"
      />
      {errors.title && (
        <div className="text-red-500">{errors.title.message}</div>
      )}

      <input
        {...register("description")}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Task Description"
      />
      {errors.description && (
        <div className="text-red-500">{errors.description.message}</div>
      )}

      <div className="border-t-2 mt-3 mb-1 pt-1">
        {errors.root && <b className="text-red-500">{errors.root.message}</b>}
      </div>
      <ButtonSubmit text="Add Task" loading={isSubmitting} />
    </form>
  );
}
