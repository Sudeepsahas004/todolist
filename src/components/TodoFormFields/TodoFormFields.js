import React from "react";
import styles from "./TodoForm.module.css";
import { PRIORITIES, PRIORITY_DEFAULT } from "../../constants/priorities";

const TodoFormFields = ({
  todo = {},
  showAllFields = true,
  register,
  watch,
  errors = {},
}) => {
  return (
    <div className={styles.FormFields}>
      <div>
        {/* ---------------- NAME FIELD ----------------
        <h4 className={styles.header}>Enter Task Name</h4>

        <input
          className={styles.nameField}
          type="text"
          name="name"
          placeholder="Enter name"
          defaultValue={todo.name}
          aria-invalid={!!errors.name}
          {...register("name", {
            required: "Name is required",
            minLength: {
              value: 3,
              message: "Name must be at least 3 characters long",
            },
            maxLength: {
              value: 50,
              message: "Name cannot exceed 50 characters",
            },
          })}
        />

        {!!errors.name && (
          <span className={styles.FormFieldError}>
            <b>{errors.name.message}</b>
          </span>
        )} */}

        {showAllFields && (
          <>
            {/* ---------------- NAME FIELD ---------------- */}
            <h4 className={styles.header}>Enter Task Name</h4>

            <input
              className={styles.nameField}
              type="text"
              placeholder="Enter name"
              defaultValue={todo.name}
              aria-invalid={!!errors.name}
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters long",
                },
                maxLength: {
                  value: 50,
                  message: "Name cannot exceed 50 characters",
                },
              })}
            />

            {!!errors.name && (
              <span className={styles.FormFieldError}>
                <b>{errors.name.message}</b>
              </span>
            )}

            {/* ---------------- Start DATE FIELD ---------------- */}
            <h4 className={styles.header}>Start Date</h4>

            <input
              type="date"
              defaultValue={todo.startDate}
              aria-invalid={!!errors.startDate}
              {...register("startDate", {
                min: !todo.id && {
                  value: new Date().toISOString().split("T")[0],
                  message: "start date cannot be in the past",
                },
              })}
            />

            {!!errors.startDate && (
              <span className={styles.FormFieldError}>
                <b>{errors.startDate.message}</b>
              </span>
            )}

            {/* End Date Field */}
            <h4 className={styles.header}>End Date</h4>

            <input
              type="date"
              defaultValue={todo.deadline}
              aria-invalid={!!errors.deadline}
              {...register("endDate", {
                validate: (endDate) => {
                  const startDate = watch("startDate");

                  if (!startDate) return true;

                  return (
                    endDate >= startDate ||
                    "End date cannot be earlier than start date"
                  );
                },
              })}
            />

            {!!errors.endDate && (
              <span className={styles.FormFieldError}>
                <b>{errors.endDate.message}</b>
              </span>
            )}

            {/* ---------------- DESCRIPTION FIELD ---------------- */}
            <h4 className={styles.header}>Description</h4>

            <input
              type="text"
              placeholder="Enter description"
              defaultValue={todo.description}
              aria-invalid={!!errors.description}
              {...register("description", {
                maxLength: {
                  value: 200,
                  message: "Description cannot exceed 200 characters",
                },
              })}
            />

            {!!errors.description && (
              <span className={styles.FormFieldError}>
                <b>{errors.description.message}</b>
              </span>
            )}

            {/* ---------------- PRIORITY FIELD ---------------- */}
            <h4 className={styles.header}>Priority</h4>

            <select
              defaultValue={todo.priority ?? PRIORITY_DEFAULT}
              aria-invalid={!!errors.priority}
              {...register("priority", {
                validate: (value) =>
                  Object.keys(PRIORITIES).includes(value) ||
                  "Priority is not valid value",
                required: "Priority is required",
              })}
            >
              {Object.entries(PRIORITIES).map(([key, { label }]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>

            {!!errors.priority && (
              <span className={styles.FormFieldError}>
                <b>{errors.priority.message}</b>
              </span>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TodoFormFields;
