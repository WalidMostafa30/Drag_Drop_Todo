import { useState } from "react";
import { useDispatch } from "react-redux";
import { closeEditForm, editPost } from "../../store/todoSlice";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import "./EditTodo.css";

const EditTodo = () => {
  const { editForm } = useSelector((state) => state.todo);
  const { droppableId, id, content } = editForm;
  const [editContent, setEditContent] = useState(content.trim());
  const [disableBtn, setDisableBtn] = useState(true);

  const dispatch = useDispatch();

  const onChangeEditContent = (e) => {
    setEditContent(e.target.value);
    if (
      content.trim() !== e.target.value.trim() &&
      e.target.value.trim().length > 0
    ) {
      setDisableBtn(false);
    } else {
      setDisableBtn(true);
    }
  };

  const submitEditHandler = (e) => {
    e.preventDefault();
    if (editContent.trim().length > 0) {
      if (content.trim() !== editContent.trim()) {
        dispatch(editPost({ content: editContent, droppableId, id }));
        dispatch(closeEditForm());
        toast.success("Todo Updated");
      }
    }
  };

  const enterHandler = (e) => {
    if (e.key === "Enter") {
      submitEditHandler(e);
    }
  };

  return (
    <div className="Edit-Task">
      <form
        className="Edit-Task__form"
        onSubmit={submitEditHandler}
        style={{ backgroundColor: `var(--main-col${droppableId})` }}
      >
        <textarea
          onChange={onChangeEditContent}
          value={editContent}
          onKeyDown={enterHandler}
        />
        <div className="Edit-Task__btns">
          <button
            disabled={disableBtn}
            style={{
              backgroundColor: "var(--main-black)",
              filter: disableBtn && "contrast(0.1)",
              cursor: disableBtn && "no-drop",
            }}
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => dispatch(closeEditForm())}
            style={{ backgroundColor: "var(--main-red)" }}
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTodo;
