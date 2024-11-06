/* eslint-disable react/prop-types */
import { Droppable } from "react-beautiful-dnd";
import ToDo from "../Todo/ToDo";
import "./Column.css";

export default function Column({ column }) {
  return (
    <div
      className="Column"
      style={{ backgroundColor: `var(--main-col${column.id})` }}
    >
      <h2 className="Column__title">{column.title}</h2>

      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="Column__todos"
            style={{
              backgroundColor: snapshot.isDraggingOver
                ? `var(--main-col${column.id}-light)`
                : "white",
            }}
          >
            {column.items.length > 0 ? (
              column.items.map((todo, index) => (
                <ToDo
                  key={todo.id}
                  todo={todo}
                  index={index}
                  droppableId={column.id}
                />
              ))
            ) : (
              <h5 className="Column__msg">
                Drop Here...
                <span>👇</span>
              </h5>
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
