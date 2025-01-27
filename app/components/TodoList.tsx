import { useFetchers } from "@remix-run/react";
import { useMemo } from "react";
import type { Item, View } from "~/type";
 
import TodoItem from "~/components/TodoItem";
 
export default function TodoList({ todos, view, }: { todos: Item[]; view: View; }) {

  const fetchers = useFetchers();
 
  const isDeleting = fetchers.some(
    (fetcher) =>
      fetcher.state !== "idle" &&
      fetcher.formData?.get("intent") === "delete task"
  );
 
  const deletingTodoIds = fetchers
    .filter(
      (fetcher) =>
        fetcher.state !== "idle" &&
        fetcher.formData?.get("intent") === "delete task"
    )
    .map((fetcher) => fetcher.formData?.get("id"));

  const visibleTodos = useMemo(() => {
    let filteredTodos = todos.filter((todo) =>
      view === "active"
        ? !todo.completed
        : view === "completed"
        ? todo.completed
        : true
    );
 
    if (isDeleting) {
      filteredTodos = filteredTodos.filter(
        (todo) => !deletingTodoIds.includes(todo.id)
      );
    }
 
    return filteredTodos;
  }, [deletingTodoIds, isDeleting, todos, view]);

  if(visibleTodos.length === 0) {
    return (
      <p className="text-center leading-7">
        {view === "all"
          ? "No tasks available"
          : view === "active"
            ? "No active tasks"
            : "No completed tasks"}
      </p>
    )
  }

  return (
    <ul>
      {visibleTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}