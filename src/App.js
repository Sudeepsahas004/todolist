import styles from "./App.module.css";
import TodoFilter from "./components/TodoFilters/TodoFilter";
import TodoForm from "./components/TodoForm/TodoForm";
import Todolist from "./components/TodoList/Todolist";
import { useState } from "react";

const TODOS_DEFAULT = [
  {
    id: "1",
    name: "Sahas",
    startDate:"2025-02-09",
    endDate: "2025-02-09",
    description: "Finish the React project",
    priority: "low",
    completed: false,
  },
  {
    id: "2",
    name: "Sudeep Sahas",
    startDate:"2025-02-09",
    endDate: "2025-02-09",
    description: "Study C# OOP concepts",
    priority: "medium",
    completed: false,
  },
  {
    id: "3",
    name: "Sai Sudeep Sahas",
   startDate:"2025-02-100",
    endDate: "2025-02-09",
    description: "Learn ASP.NET MVC",
    priority: "high",
    completed: true,
  },
];

function App() {
  const [todos, setTodos] = useState(TODOS_DEFAULT);
  const [filters, setFilters] = useState({});
    const [showAllFields, setShowAllFields] = useState(false);
  

  function handleCreate(newTodo) {
    setTodos([...todos, newTodo]);
  }

  function handleUpdate(id, newTodo) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? newTodo : todo))
    );
  }

  function handleDelete(id) {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }

  function filterTodos(todo) {
    const { completed, priority } = filters;
    return (
      (completed === "" || todo.completed === completed) &&
      (priority === "" || todo.priority === priority)
    );
  }

  return (
    <div className={styles.App}>
      <header className={styles.Header}>
        <img className={styles.Logo} src="/to-do.png" alt="TO DO" />
        <h2 className={styles.Title}>To-Do-App</h2>
      </header>

     
      
      <TodoForm showAllFields={showAllFields} setShowAllFields={setShowAllFields} onCreate={handleCreate} />
      <TodoFilter  todos={todos.filter(todo => filterTodos(todo))} onFilters={setFilters} />
      <Todolist
        todos={todos.filter(todo => filterTodos(todo))}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;
