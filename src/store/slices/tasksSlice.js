import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: "tasks",

  initialState,

  reducers: {
    addTask: (state, action) => {
      state.tasks.push({
        id: Date.now(),
        title: action.payload,
        completed: false,
      });
    },

    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(
        (task) => task.id !== action.payload
      );
    },

    toggleTask: (state, action) => {
      const task = state.tasks.find(
        (task) => task.id === action.payload
      );

      if (task) {
        task.completed = !task.completed;
      }
    },

    updateTask: (state, action) => {
      const { id, title } = action.payload;

      const task = state.tasks.find(
        (task) => task.id === id
      );

      if (task) {
        task.title = title;
      }
    },
  },
});

export const {
  addTask,
  deleteTask,
  toggleTask,
  updateTask,
} = tasksSlice.actions;

export default tasksSlice.reducer;