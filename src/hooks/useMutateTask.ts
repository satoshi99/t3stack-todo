import { useUpdateEditedTask } from "../recoil/task";
import { trpc } from "../utils/trpc";

export const useMutateTask = () => {
  const utils = trpc.useContext();
  const { resetEditedTask } = useUpdateEditedTask();

  const createTaskMutation = trpc.todo.createTask.useMutation({
    onSuccess: (res) => {
      const previousTodos = utils.todo.getTasks.getData();
      if (previousTodos) {
        utils.todo.getTasks.setData([res, ...previousTodos]);
      }
      resetEditedTask();
    },
  });

  const updateTaskMutation = trpc.todo.updateTask.useMutation({
    onSuccess: (res) => {
      const previousTodos = utils.todo.getTasks.getData();
      if (previousTodos) {
        utils.todo.getTasks.setData(
          previousTodos.map((task) => (task.id === res.id ? res : task))
        );
      }
      resetEditedTask();
    },
  });

  const deleteTaskMutation = trpc.todo.deleteTask.useMutation({
    onSuccess: (_, variables) => {
      const previousTodos = utils.todo.getTasks.getData();
      if (previousTodos) {
        utils.todo.getTasks.setData(
          previousTodos.filter((task) => task.id !== variables.taskId)
        );
      }
      resetEditedTask();
    },
  });

  return { createTaskMutation, updateTaskMutation, deleteTaskMutation };
};
