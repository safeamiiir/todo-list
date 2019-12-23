import React, { useContext, useState } from "react";
import Store from "../context";

export default function TodoForm() {
  const { dispatch } = useContext(Store);

  // Creating a local state to have currently writing
  // todo item that will be sent to the global store.
  const [todo, setTodo] = useState("");
  const [priority, setPriority] = useState(3)


  function handleTodoChange(e) {
    setTodo(e.target.value);
  }

  function handleTodoAdd() {
    dispatch({ type: "ADD_TODO", payload: { name: todo, state: priority } });
    setTodo("");
  }

  function handleSubmitForm(event) {
    if (event.keyCode === 13) handleTodoAdd();
  }

  function handlePriorityChanges(e) {
    setPriority(e.target.value);
  }


  return (
    <div className="row">
      <div className="col-md-12">
        <br />
        <div className="input-group">
          <input
            className="form-control"
            value={todo}
            autoFocus={true}
            placeholder="Enter new todo"
            onKeyUp={handleSubmitForm}
            onChange={handleTodoChange}
          />
          <select
            onChange={e => handlePriorityChanges(e)}
          >
            <option>3</option>
            <option>2</option>
            <option>1</option>
          </select>
          <div className="input-group-append">
            <button className="btn btn-primary" onClick={handleTodoAdd}>
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
