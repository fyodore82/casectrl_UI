import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { RootState } from "../store"

export type ToDoItem = {
  id: number
  title: string
  description: string | null
  accountId: string
  createdAt: string
  modifedOn: string | null
  createdBy: string
  modifiedBy: string | null
}

export type ToDoState = {
  toDoList: ToDoItem[]
  isLoading: boolean
}

const initialState: ToDoState = {
  toDoList: [],
  isLoading: false,
}

const name = 'todoReducer'

export const fetchToDoList = createAsyncThunk<ToDoItem[], void, { state: RootState }>(
  `${name}/fetchToDoList`,
  async () => {
    const { data } = await axios.get<ToDoItem[]>(`${process.env.REACT_APP_TODO_API}/todo`)
    return data
  },
  {
    condition: (_, { getState }) => !getState().todo.isLoading
  }
)

export const deleteToDoItem = createAsyncThunk<void, number>(
  `${name}/deleteToDoItem`,
  async (id) => {
    await axios.delete(`${process.env.REACT_APP_TODO_API}/todo/${id}`)
  }
)

export const updateToDoItem = createAsyncThunk<ToDoItem, ToDoItem>(
  `${name}/updateToDoItem`,
  async (toDoItem) => {
    const { data } = await axios.put<ToDoItem>(`${process.env.REACT_APP_TODO_API}/todo/${toDoItem.id}`, toDoItem)
    return data
  }
)

export const createToDoItem = createAsyncThunk<ToDoItem, ToDoItem>(
  `${name}/createToDoItem`,
  async (toDoItem) => {
    const { data } = await axios.post<ToDoItem>(`${process.env.REACT_APP_TODO_API}/todo`, toDoItem)
    return data
  }
)

const todoReducer = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: ({ addCase }) => {
    addCase(fetchToDoList.fulfilled, (state, { payload }) => {
      state.toDoList = payload
      state.isLoading = false
    })
    addCase(fetchToDoList.pending, (state, { payload }) => {
      state.isLoading = true
    })
    addCase(fetchToDoList.rejected, (state, { payload }) => {
      state.isLoading = false
    })
    addCase(deleteToDoItem.fulfilled, (state, { meta: { arg } }) => {
      state.toDoList = state.toDoList.filter(({ id }) => id !== arg)
    })
    addCase(updateToDoItem.fulfilled, (state, { payload }) => {
      state.toDoList = state.toDoList.map((toDoItem) => toDoItem.id === payload.id ? payload : toDoItem)
    })
    addCase(createToDoItem.fulfilled, (state, { payload }) => {
      state.toDoList.push(payload)
    })
  }
})

export default todoReducer
