import React, { useContext } from "react";
import Store from "../context";
import { TodoHeader } from "./TodoHeader";

export default function TodoList() {
  const { state, dispatch } = useContext(Store);

  const pluralize = (count, done) =>
    count > 1 ? `There are ${count} todos` : `There is ${count} todo`;

  let header =
    state.todos.filter(task => task.state !== 0).length === 0 ? (
      <h4>You did everything in list! <br /> now relax :)) </h4>
    ) : (
        <TodoHeader>
          <div>
            <h5 style={{ marginTop: 0 }}>Todo List</h5>
          </div>
          <div>{pluralize(state.todos.filter(task => task.state !== 0).length)}</div>
          <br />
          <div>{`and ${state.todos.filter(task => task.state === 0).length === 0 ? 'nothing' : state.todos.filter(task => task.state === 0).length} completed`}</div>
        </TodoHeader >
      );
  return (
    <div>
      <div className="container-style">
        <div className="title-row">
          <br />
          {header}
        </div>
        <div className="row">
          <div>
            <ul className="list-group">
              {state.todos.map(task => (
                <li key={task.name} className="list-group-item">
                  {task.state !== 0 &&
                    <button
                      className={task.state === 4 ? "unpin-button-style" : 'pin-button-style'}
                      style={{ marginRight: 10 }}
                      onClick={() => dispatch({ type: "PIN", payload: task })}
                    >
                      {task.state === 4 ? 'unpin' : 'pin'}
                    </button>}
                  {task.name}
                  <button
                    className={task.state !== 0 ? "complete-button-style" : "completed-button-style"}
                    style={{ marginLeft: 10 }}
                    onClick={() => dispatch({ type: "COMPLETE", payload: task.name })}
                    disabled={task.state === 0}
                  >
                    {task.state === 0 ? 'Completed' : 'Complete'}
                  </button>
                </li>
              ))}
            </ul>
            {state.todos.length !== 0 &&
              <button
                className="remove-button-style"
                style={{ marginLeft: 10 }}
                onClick={() => dispatch({ type: "REMOVE_ALL" })}
              >
                Remove All
            </button>}
            {state.todos.filter(task => task.state === 0).length !== 0 &&
              <button
                className="remove-button-style"
                style={{ marginLeft: 10 }}
                onClick={() => dispatch({ type: "REMOVE_ALL_COMPLETED" })}
              >
                Remove All Completed
            </button>}
          </div>
        </div>
      </div>
    </div>
  );
}
