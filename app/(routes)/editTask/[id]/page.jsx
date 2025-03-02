import EditTaskForm from "@/components/EditTaskForm";
import useFetch_server from "@/components/custom-hooks/useFetch_server";

const getTaskById = async (id) => {
  try {
    const { data } = await useFetch_server(
      "GET",
      `http://localhost:3000/api/tasks/${id}`
    );

    if (data) {
      return data;
    }

    throw new Error("Failed to fetch Task");
  } catch (error) {
    console.log(error);
  }
};

export default async function EditTask({ params }) {
  const { id } = params;
  const { task } = await getTaskById(id);
  const { title, description } = task;

  return <EditTaskForm id={id} title={title} description={description} />;
}
