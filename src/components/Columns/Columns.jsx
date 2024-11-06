import "./Columns.css";
import Column from "../Column/Column";
import { DragDropContext } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { swipeTodo } from "../../store/todoSlice";

export default function Columns() {
  const { todo } = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  const onDradEndHandle = (result) => {
    const { source, destination } = result;
    dispatch(swipeTodo({ source, destination }));
  };

  return (
    <DragDropContext onDragEnd={onDradEndHandle}>
      <div className="Columns">
        {todo.some((column) => column.items.length > 0) ? (
          todo.map((column) => <Column key={column.id} column={column} />)
        ) : (
          <h3 className="Columns__msg">No Todos Yet.. Add Some</h3>
        )}
      </div>
    </DragDropContext>
  );
}
