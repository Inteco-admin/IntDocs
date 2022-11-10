import todoService from "../services/todoService";
import { Todo } from "../types/Todo";
import { ref } from "vue";

export function useTodos() {
  const todos = ref<Todo[]>([])

  const fetchReferenceTodo = async (name:any) : Promise<void> => {
    const response = await todoService.getListByReferenceName(name)
    todos.value = response.data.data
  }

  return { todos, fetchReferenceTodo}
}