import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import styles from "./TodolistItem.module.css";
import { PRIORITIES, PRIORITY_DEFAULT } from "../../constants/priorities";
import TodoFormFields from "../TodoFormFields/TodoFormFields";

const TodolistItem = ({ todo, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { register, handleSubmit,formState:{errors} } = useForm({defaultValues:todo});

  // const handleEdit = (data) => {
  //   const form = event.target;
  //   const newTodo = {
  //     id: Date.now(),
  //     name: form.name.value,
  //     gender: form.gender.value,
  //     deadline: form.date.value,
  //     description: form.description.value,
  //     priority: form.priority.value,
  //     completed: false,
  //   };

  //   onUpdate(todo.id, newTodo);
  //   setIsEditing(false);
  // };

  function handleEdit(data){
    onUpdate(todo.id,data)
    setIsEditing(false)
  }

  const handleCompleted = (event) => {
    onUpdate(todo.id, { ...todo, completed: event.target.checked });
  };

  const viewingTemplate = (
    <div className={styles.Content}>
      <input
        type="checkbox"
        name="completed"
        checked={todo.completed}
        onChange={handleCompleted}
        className={styles.Status}
      />
      <div className={styles.Info}>
        <p>
          <b>Name:</b> {todo.name}
        </p>
        <p>
          <b>Start Date:</b> {todo.startDate}
        </p>
        <p>
          <b>End Date:</b> {todo.endDate}
        </p>
        <p>
          <b>Description:</b> {todo.description}
        </p>

        {todo.priority !== PRIORITY_DEFAULT && (
          <span
            style={{
              color: PRIORITIES[todo.priority]?.color,
              fontWeight: "bold",
            }}
          >
            {PRIORITIES[todo.priority]?.label}
          </span>
        )}
      </div>
      <div className={styles.Controls}>
        <button onClick={() => setIsEditing(true)}>✏️</button>
        <button onClick={() => onDelete(todo.id)}>🗑️</button>
      </div>
    </div>
  );

  const editingTemplate = (
    <form
      className={styles.Content}
      onReset={() => setIsEditing(false)}
      onSubmit={handleSubmit(handleEdit)}
    >
      <TodoFormFields todo={todo} register={register} errors={errors}/>
      <div>
        <input type="submit" value="💾" />
        <input type="reset" value="🔃" />
      </div>
    </form>
  );

  return (
    <>
      <li
        key={todo.id}
        className={styles.TodoListItem}
        data-completed={todo.completed}
      >
        {isEditing ? editingTemplate : viewingTemplate}
      </li>
      <hr></hr>
    </>
  );
};

export default TodolistItem;
