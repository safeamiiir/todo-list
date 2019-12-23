import React from "react";

// Store Context is the global context that is managed by reducers.

const Store = React.createContext({
  todos: [
    // Initial Data
    {
      name: "Do Yektanet tasks",
      state: 3
    },
    {
      name: "Set time for interview",
      state: 2
    },
    {
      name: "talk about financial stuff :D",
      state: 1
    }
  ]
});

export default Store;
