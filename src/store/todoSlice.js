import { createSlice } from "@reduxjs/toolkit";

const DDTodoList = localStorage.getItem("DDTodoList")
  ? JSON.parse(localStorage.getItem("DDTodoList"))
  : [
      {
        id: "1",
        title: "To-Do",
        items: [],
      },
      {
        id: "2",
        title: "In-Progress",
        items: [],
      },
      {
        id: "3",
        title: "Done",
        items: [],
      },
    ];

const DDTodoListInLS = (data) => {
  localStorage.setItem("DDTodoList", JSON.stringify(data));
};

const initialState = {
  todo: DDTodoList,
  editForm: {
    status: false,
    id: null,
    content: null,
    droppableId: null,
  },
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.todo[0].items.push(action.payload);
      DDTodoListInLS(state.todo);
    },

    removePost: (state, action) => {
      const { droppableId, id } = action.payload;
      state.todo[droppableId - 1].items = state.todo[
        droppableId - 1
      ].items.filter((item) => item.id !== id);
      DDTodoListInLS(state.todo);
    },

    editPost: (state, action) => {
      const { id, content, droppableId } = action.payload;
      const todo = state.todo[droppableId - 1].items.find(
        (todo) => todo.id === id
      );
      if (todo) {
        todo.content = content;
      }
      DDTodoListInLS(state.todo);
    },

    swipeTodo: (state, action) => {
      const source = action.payload.source;
      const destination = action.payload.destination;

      if (!action.payload.destination) return;

      // in another column
      if (source.droppableId !== destination.droppableId) {
        const sourceColumnIndex = state.todo.findIndex(
          (e) => e.id === source.droppableId
        );
        const destColumnIndex = state.todo.findIndex(
          (e) => e.id === destination.droppableId
        );
        const sourceColumn = state.todo[sourceColumnIndex];
        const destColumn = state.todo[destColumnIndex];
        const sourceItems = [...sourceColumn.items];
        const destItems = [...destColumn.items];
        const [removed] = sourceItems.splice(source.index, 1);
        destItems.splice(destination.index, 0, removed);
        state.todo[sourceColumnIndex].items = sourceItems;
        state.todo[destColumnIndex].items = destItems;
        DDTodoListInLS(state.todo);

        // in same column
      } else {
        const sourceColumnIndex = state.todo.findIndex(
          (e) => e.id === source.droppableId
        );
        const sourceColumn = state.todo[sourceColumnIndex];
        const sourceItems = [...sourceColumn.items];
        const [removed] = sourceItems.splice(source.index, 1);
        sourceItems.splice(destination.index, 0, removed);
        state.todo[sourceColumnIndex].items = sourceItems;
        DDTodoListInLS(state.todo);
      }
    },

    openEditForm: (state, action) => {
      const { droppableId, id, content } = action.payload;
      state.editForm.status = true;
      state.editForm.id = id;
      state.editForm.droppableId = droppableId;
      state.editForm.content = content;
    },

    closeEditForm: (state) => {
      state.editForm.status = false;
      state.editForm.id = null;
      state.editForm.droppableId = null;
      state.editForm.content = null;
    },
  },
});

export const {
  addPost,
  removePost,
  editPost,
  swipeTodo,
  openEditForm,
  closeEditForm,
} = todoSlice.actions;
export default todoSlice.reducer;
