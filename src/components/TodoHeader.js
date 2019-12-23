import React from "react";

export const TodoHeader = (props) => (
  <div className="container-style">
    <div>
      <h5 style={{ margin: 0 }}>Todo List</h5>
    </div>
    <div className="col-md-4">
      {props.children}
    </div>
  </div>
);
