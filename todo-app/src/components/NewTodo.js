import { useState } from "react";

function NewTodo({ onAdd }) {
  const [text, setText] = useState("");
  console.log("render " + text);

  return (
    <div className="row">
      <div className="col d-flex justify-content-center">
        <div className="flex-fill">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            type="text"
            className="form-control"
            placeholder="New task"
          />
        </div>
        <button
          onClick={() => {
            onAdd(text);
            setText("");
          }}
          type="submit"
          className="btn btn-info ms-2"
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default NewTodo;
