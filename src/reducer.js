export default function reducer(state, action) {
  switch (action.type) {
    case "ADD_TODO":
      // return current state if empty
      if (!action.payload) {
        return state;
      }
      // return current state if duplicate
      var valueArr = state.todos.map(function (item) { return item.name });
      var isDuplicate = valueArr.some(function (item, idx) {
        return valueArr.indexOf(item) !== idx
      });
      if (isDuplicate) {
        return state;
      } //FIXME: problem in priority handling when some of them are equal
      return handleSortPriorities(state, action.payload)
    // return {
    // ...state,
    // todos: [...state.todos, action.payload]
    // };
    case "COMPLETE":
      return handleCompletedTodos(state, action.payload)
    case "PIN":
      return handlePinTodos(state, action.payload)
    default:
      return state;
  }
}

function handleCompletedTodos(state, payload) {
  return ({
    ...state,
    todos: [...state.todos.filter(task => task.name !== payload), { name: payload, state: 0 }]
  })
};

function handlePinTodos(state, payload) {
  if (payload.state === 4) {
    var newTodos = {
      ...state,
      todos: [...state.todos.filter(task => task.name !== payload.name), { name: payload.name, state: payload.lastState }]
    }
    newTodos.todos.sort((a, b) => (Number(a.state) < Number(b.state)) ? 1 : -1)
    return newTodos
  } else {
    var newTodos = {
      ...state,
      todos: [...state.todos.filter(task => task.name !== payload.name), { name: payload.name, state: 4, lastState: payload.state }]
    }
    newTodos.todos.sort((a, b) => (Number(a.state) < Number(b.state)) ? 1 : -1)
    return newTodos
  }
};

function handleSortPriorities(state, payload) {
  var newTodos = {
    ...state,
    todos: [...state.todos, payload]
  }
  newTodos.todos.sort((a, b) => (Number(a.state) < Number(b.state)) ? 1 : -1)
  return newTodos
};
