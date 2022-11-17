import { FC } from "react";
import { UpdateTaskInput } from "../schema/todo";
import { useUpdateEditedTask } from "../recoil/task";
import { useMutateTask } from "../hooks/useMutateTask";
import Link from "next/link";

export const TaskItem: FC<UpdateTaskInput> = ({ taskId, title, body }) => {
  const { updateEditedTask } = useUpdateEditedTask();
  const { deleteTaskMutation } = useMutateTask();

  return (
    <li>
      <Link href={`/task/${taskId}`}>
        <span className="cursor-pointer">{title}</span>
      </Link>
      <div className="float-right ml-20 flex">
        <button
          className="mx-1 cursor-pointer text-blue-600"
          onClick={() => {
            updateEditedTask({ taskId, title, body });
          }}
        >
          Edit
        </button>
        <button
          className="mx-1 cursor-pointer text-pink-600"
          onClick={() => {
            deleteTaskMutation.mutate({ taskId });
          }}
        >
          Delete
        </button>
      </div>
      {deleteTaskMutation.isLoading && (
        <p className="mb-2 text-green-500">Mutation under process...</p>
      )}
    </li>
  );
};
