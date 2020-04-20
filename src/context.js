import React from "react";

// Store Context is the global context that is managed by reducers.

const Store = React.createContext({
  todos: [
    // Initial Data
    {
      name: "Do Yektanet tasks",
      state: 3,
      createdTime: new Date().getTime()
    },
    {
      name: "Set time for interview",
      state: 2,
      createdTime: new Date().getTime()
    },
    {
      name: "talk about financial stuff :D",
      state: 1,
      createdTime: new Date().getTime()
    }
  ]
});

export default Store;
