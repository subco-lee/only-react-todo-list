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
        flexDirection: "column",
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
        position: "fixed",
        top: 64,
      }}
    >
      <h1>TODO LIST</h1>
      <h4>Add, Delete, and Toggle your todos!</h4>
    </div>
  );
}

function Todos({ todos, toggleTodo, deleteTodo }) {
  return (
    <div
      style={{
        display: "flex",
        width: 500,
        minHeight: 500,
        borderRadius: 8,
        backgroundColor: "hsl(200, 45%, 88%)",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {todos.length === 0 ? (
        <p
          style={{
            color: "hsl(360, 10%, 50%)",
          }}
        >
          There are no todos
        </p>
      ) : (
        todos.map((todo) => (
          <div
            key={todo.id}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Task title={todo.title} completed={todo.completed} />
            <button onClick={() => deleteTodo(todo.id)}>❌</button>
            <button onClick={() => toggleTodo(todo.id)}>✅</button>
          </div>
        ))
      )}
    </div>
  );
}

function AddTodo({ addTodo }) {
  const [open, setOpen] = React.useState(false);
  const inputRef = React.useRef(null);

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 8,
          position: "fixed",
          bottom: 64,
        }}
      >
        <button
          style={{
            cursor: "pointer",
            backgroundColor: "hsl(200, 45%, 88%)",
            color: "hsl(200, 50%, 40%)",
            fontSize: 32,
            borderRadius: "100%",
            width: 64,
            height: 64,
            border: "none",
            boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.15)",
          }}
          onClick={() => setOpen(true)}
        >
          +
        </button>
        {open && (
          <div
            style={{
              position: "fixed",
              zIndex: 1,
              top: 0,
              left: 0,
              zIndex: 5,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
            onClick={() => setOpen(false)}
          />
        )}
      </div>
      {open && (
        <div
          style={{
            position: "fixed",
            zIndex: 10,
            top: "calc(50vh - 100px)",
            left: "calc(50vw - 200px)",
            zIndex: 10,
            width: 400,
            height: 200,
            borderRadius: 8,
            boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.45)",
            backgroundColor: "hsl(220, 45%, 88%)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 12,
          }}
        >
          <h3>입력하라 할일</h3>
          <input ref={inputRef} placeholder="Todo title" />
          <button
            style={{
              backgroundColor: "hsl(200, 45%, 58%)",
              color: "hsl(200, 50%, 90%)",
              fontSize: 16,
              fontWeight: "bold",
              borderRadius: 8,
              border: "none",
              padding: "8px 16px",
            }}
            onClick={() => {
              addTodo(inputRef.current.value);

              setOpen(false);
            }}
          >
            추가
          </button>
        </div>
      )}
    </div>
  );
}

function Task({ id, title, completed }) {
  return (
    <div
      key={id}
      style={{
        border: "1px solid black",
        padding: "10px",
        margin: "10px",
        width: "300px",
        textAlign: "center",
        display: "flex",
        flexDirection: "row",
        gap: 8,
      }}
    >
      <p>{title}</p>
      <span>{completed ? "✅" : "⏹️"}</span>
    </div>
  );
}

function App() {
  const [todos, setTodos] = React.useState([]);
  const ref = React.useRef(0);

  const addTodo = (value) => {
    setTodos([...todos, { id: ref.current, title: value, completed: false }]);
    ref.current++;
  };

  const toggleTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <Background>
        <Description />
        <Todos todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
        <AddTodo addTodo={addTodo} />
      </Background>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
