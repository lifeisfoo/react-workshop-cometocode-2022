import { useEffect, useState } from "react";
import NewTodo from "./components/NewTodo";
import Title from "./components/Title";
import TodoList from "./components/TodoList";
import { get, patchData, postData } from "./utils";

export default function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    get("/api/todos").then((res) => {
      setTodos(res);
    });
  }, []); // <<--- fired only at component's mount

  function toggleDone(id, done) {
    patchData(`/api/todos/${id}`, { done: done }).then((patchedTodo) => {
      const todoIdx = todos.findIndex((t) => t.id === id);
      const tmpTodos = [...todos];
      tmpTodos.splice(todoIdx, 1, patchedTodo);
      setTodos(tmpTodos);
    });
  }

  function handleCreateTodo(text) {
    postData(`/api/todos`, { text, done: false }).then((newTodo) => {
      setTodos([newTodo, ...todos]);
    });
  }

  return (
    <div className="container py-5">
      <Title>My App title</Title>
      <NewTodo
        onAdd={(text) => {
          handleCreateTodo(text);
        }}
      />
      <TodoList todos={todos} toggleDone={toggleDone} />
    </div>
  );
}
