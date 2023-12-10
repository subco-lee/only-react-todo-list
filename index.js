function Background({ children }) {
  return (
    <div
      style={{
        width: "100vw",
        backgroundColor: "whitesmoke",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {children}
    </div>
  );
}

function Description() {
  return (
    <div
      style={{
        textAlign: "center",
      }}
    >
      <h1>TODO LIST</h1>
      <h3>Add, Delete, and Toggle your todos!</h3>
    </div>
  );
}

function Todos({ todos, deleteTodo, toggleTodo }) {
  return (
    <div>
      {todos.map((todo) => (
        <div key={todo.id}>
          <p
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
            }}
          >
            {todo.text}
          </p>
          <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          <button onClick={() => toggleTodo(todo.id)}>Toggle</button>
        </div>
      ))}
    </div>
  );
}

function App() {
  const [todos, setTodos] = React.useState([
    { id: 1, text: "Buy milk", completed: false },
    { id: 2, text: "Buy eggs", completed: false },
    { id: 3, text: "Buy bread", completed: false },
  ]);

  return (
    <div>
      <Background>
        <Description />
        <Todos todos={todos} />
      </Background>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
