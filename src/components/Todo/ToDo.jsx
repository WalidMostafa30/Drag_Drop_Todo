/* eslint-disable react/prop-types */
import { Draggable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { removePost, openEditForm } from "../../store/todoSlice";
import "./ToDo.css";
import toast from "react-hot-toast";

export default function ToDo({ todo, index, droppableId }) {
  const dispatch = useDispatch();

  const deleteTodo = () => {
    dispatch(removePost({ droppableId, id: todo.id }));
    toast.success("Task Deleted");
  };

  const handleEditForm = () => {
    dispatch(openEditForm({ droppableId, id: todo.id, content: todo.content }));
  };

  return (
    <Draggable key={todo.id} draggableId={todo.id} index={index}>
      {(provided) => (
        <div
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
          className="ToDo"
        >
          <div
            className="Todo__container"
            style={{ backgroundColor: `var(--main-col${droppableId})` }}
          >
            <h4
              className="ToDo__content"
              style={{ textDecoration: droppableId == 3 && "line-through" }}
            >
              {todo.content}
            </h4>

            <div className="ToDo__btns">
              <span
                onClick={handleEditForm}
                style={{ backgroundColor: "var(--main-black)" }}
              >
                Edit
              </span>
              <span
                onClick={deleteTodo}
                style={{ backgroundColor: "var(--main-red)" }}
              >
                Delete
              </span>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}
