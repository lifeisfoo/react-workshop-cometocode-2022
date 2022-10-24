import React from "react";

const tiClasses =
  "d-flex align-items-center list-group-item my-1 border rounded-1";
const TodotItem = ({ id, text, done, toggleDone }) => {
  const textoToShow = done ? <del>{text}</del> : text;
  return (
    <li key={id} className={tiClasses}>
      <input
        className="form-check-input mx-1 my-0"
        type="checkbox"
        checked={done}
        onChange={() => toggleDone(id, !done)}
      />
      <span className="mx-2">{textoToShow}</span>
    </li>
  );
};
const TodoList = ({ todos, toggleDone }) => {
  return (
    <>
      <hr />
      <ul className="list-group pb-3">
        {todos.map((t) => {
          return (
            <TodotItem
              id={t.id}
              text={t.text}
              done={t.done}
              toggleDone={toggleDone}
            />
          );
        })}
      </ul>
    </>
  );
};

export default TodoList;
