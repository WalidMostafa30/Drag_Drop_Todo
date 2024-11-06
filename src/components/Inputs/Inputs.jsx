import { useDispatch } from "react-redux";
import { useState } from "react";
import { addPost } from "../../store/todoSlice";
import toast from "react-hot-toast";
import "./Inputs.css";

const Inputs = () => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const onChangeHandler = (e) => {
    setInput(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (input.trim().length > 0) {
      dispatch(
        addPost({
          id: `${new Date().getTime()}`,
          content: input,
        })
      );
      toast.success("Task Added");
      setInput("");
    } else {
      toast.error("Enter any task to post !!");
    }
  };

  return (
    <form className="form" onSubmit={onSubmitHandler}>
      <input
        className="form__input"
        placeholder="Add Task..."
        onChange={onChangeHandler}
        value={input}
      />
      <button className="form__btn">Add</button>
    </form>
  );
};

export default Inputs;
