export default function reducer(state, action) {
  switch (action.type) {

    case "ADD_TODO":
      // return current state if empty
      if (!action.payload.name.trim()) {
        return state;
      }
      // return current state if you write duplicate
      if (checkDuplicateInObject('name', [...state.todos, action.payload]))
        return state
      return handleSortPriorities(state, action.payload)//FIXME: problem in priority handling when some of them are equal

    case "COMPLETE":
      return handleCompletedTodos(state, action.payload)

    case "PIN":
      return handlePinTodos(state, action.payload)
    default:
      return state;

    case "REMOVE_ALL":
      return ({
        ...state,
        todos: []
      })

    case "REMOVE_ALL_COMPLETED":
      return ({
        ...state,
        todos: [...state.todos.filter(task => task.state !== 0)]
      })
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

function checkDuplicateInObject(propertyName, inputArray) {
  var seenDuplicate = false,
    testObject = {};

  inputArray.map(function (item) {
    var itemPropertyName = item[propertyName];
    if (itemPropertyName in testObject) {
      testObject[itemPropertyName].duplicate = true;
      item.duplicate = true;
      seenDuplicate = true;
    }
    else {
      testObject[itemPropertyName] = item;
      delete item.duplicate;
    }
  });

  return seenDuplicate;
}
