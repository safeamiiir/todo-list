import React from "react";

export const TodoHeader = (props) => (
  <div className="container-style">
    <div className="column">
      {props.children}
    </div>
  </div>
);
