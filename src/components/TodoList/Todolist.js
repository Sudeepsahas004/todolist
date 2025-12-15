import React from "react";
import TodolistItem from "../TodolistItem/TodolistItem"
import styles from "./Todolist.module.css"

const Todolist = ({ todos,onUpdate,onDelete }) => {
  return (
    <section className={styles.todolistSection}>
      <h2>To Do's</h2>
      {!todos.length && <h3>Sorry,  you dont have any TO-Do's</h3>}
      <ul>
        {todos.map((todo) => (
        <TodolistItem key={todo.id} todo={todo} onUpdate={onUpdate} onDelete={onDelete}/>
        ))}
      </ul>
    </section>
  );
};

export default Todolist;
