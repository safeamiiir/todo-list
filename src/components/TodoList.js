import React, { useContext } from "react";
import Store from "../context";
import { TodoHeader } from "./TodoHeader";

export default function TodoList() {
  const { state, dispatch } = useContext(Store);

  const pluralize = count =>
    count > 1 ? `There are ${count} todos.` : `There is ${count} todo.`;

  let header =
    state.todos.filter(task => task.state !== 0).length === 0 ? (
      <h4>Yay! All todos are done! Take a rest!</h4>
    ) : (
        <TodoHeader>
          <span className="float-right">{pluralize(state.todos.filter(task => task.state !== 0).length)}</span>
        </TodoHeader>
      );
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="row">
          <div className="col-md-12">
            <br />
            {header}
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <ul className="list-group">
              {state.todos.map(task => (
                <li key={task.name} className="list-group-item">
                  {task.state !== 0 &&
                    <button
                      className="float-right btn btn-danger btn-sm"
                      style={{ marginLeft: 10 }}
                      onClick={() => dispatch({ type: "PIN", payload: task })}
                    >
                      {task.state === 4 ? 'unpin' : 'pin'}
                    </button>}
                  {task.name}
                  <button
                    className="float-right btn btn-danger btn-sm"
                    style={{ marginLeft: 10 }}
                    onClick={() => dispatch({ type: "COMPLETE", payload: task.name })}
                    disabled={task.state === 0}
                  >
                    {task.state === 0 ? 'Completed' : 'Complete'}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
