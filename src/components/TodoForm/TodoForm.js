import { useForm } from "react-hook-form";
import styles from "./TodoForm.module.css";
import TodoFormFields from "../TodoFormFields/TodoFormFields";
import { PRIORITY_DEFAULT } from "../../constants/priorities";

const TodoForm = ({ onCreate,showAllFields,setShowAllFields }) => {
  // const [showAllFields, setShowAllFields] = useState(true);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      description: "",
      startDate:"",
      endDate: "",
      priority: PRIORITY_DEFAULT,
      completed: false,
    },
  });

  // const handleSubmit= (event) => {
  //   event.preventDefault();

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

  //   onCreate(newTodo);
  //   form.reset(); // clear form after submit
  // };

  const handleCreate = (data) => {
    onCreate(data);
    reset();
  };

  return (
    <div className={styles.buttonBox}>
      {/* <span className={showAllFields ? styles.titleHide : styles.titleBlock}>
        Click here to add Task
      </span> */}

      <button
        className={`${styles.hide} ${
          showAllFields ? styles.redBtn : styles.violetBtn
        }`}
        onClick={() => setShowAllFields(!showAllFields)}
      >
        {showAllFields ? "X" : "Click here to Add a new Task +"}
      </button>
      {showAllFields && (
        <form onSubmit={handleSubmit(handleCreate)}>
          <TodoFormFields
            showAllFields={showAllFields}
            register={register}
            errors={errors}
            watch={watch}
          />
          <button className={styles.submit} type="submit">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default TodoForm;
