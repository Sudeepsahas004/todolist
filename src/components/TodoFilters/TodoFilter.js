import React, { useEffect, useState } from "react";
import styles from "./TodoFilters.module.css";
import { COMPLETED_FILTERS, PRIORITY_FILTERS } from "../../constants/filters";
import { PRIORITIES } from "../../constants/priorities";

const TodoFilter = ({todos, onFilters }) => {
  const [completed, setCompleted] = useState("all");
  const [priority, setPriority] = useState("all");

  useEffect(() => {
    const filters = {
      completed: COMPLETED_FILTERS[completed]?.value,
      priority: PRIORITY_FILTERS[priority]?.value,
    };
    onFilters(filters);
  }, [completed, priority, onFilters]); // ✅ correct dependencies

  return (

    
    <section className={styles.FilterSection}>
      {todos.length>0 && (<div className={styles.Filter}>
        {/* Completed Filter */}
        <label htmlFor="completed">Completed</label>
        <select
          id="completed"
          value={completed}
          onChange={(e) => setCompleted(e.target.value)}
        >
          {Object.entries(COMPLETED_FILTERS).map(([key, { label }]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>

        {/* Priority Filter */}
        <label htmlFor="priority">Priority</label>
        <select
          id="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          {Object.entries(PRIORITIES).map(([key, { label }]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
      </div>)}
      {/* <h3>Filters</h3> */}
      
    </section>
  );
};

export default TodoFilter;
