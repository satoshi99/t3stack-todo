import { useCallback } from "react";
import { atom, useRecoilState } from "recoil";
import { UpdateTaskInput } from "../schema/todo";

const editedTaskState = atom<UpdateTaskInput>({
  key: "editedTask",
  default: {
    taskId: "",
    title: "",
    body: "",
  },
});

export const useUpdateEditedTask = () => {
  const [editedTask, setEditedTask] = useRecoilState(editedTaskState);
  const updateEditedTask = useCallback(
    (payload: UpdateTaskInput) => {
      setEditedTask({ ...payload });
    },
    [setEditedTask]
  );
  const resetEditedTask = useCallback(() => {
    setEditedTask({
      taskId: "",
      title: "",
      body: "",
    });
  }, [setEditedTask]);

  return { editedTask, updateEditedTask, resetEditedTask };
};
