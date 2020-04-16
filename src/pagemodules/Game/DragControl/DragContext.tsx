import React from 'react'
import { MoveSet } from 'game'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type DragState = {
  isDragging: boolean
  direction: MoveSet | null
}
const defaultState: DragState = { isDragging: false, direction: null }

export const drag = createSlice({
  name: 'dragcontrol',
  initialState: defaultState,
  reducers: {
    dragStart: (state) => {
      state.isDragging = true
    },
    dragEnd: (state) => {
      state.isDragging = false
      state.direction = null
    },
    changeDirection: (state, action: PayloadAction<MoveSet | null>) => {
      state.direction = action.payload
    },
  },
})

export const DragDispatchContext = React.createContext<React.Dispatch<any>>(
  () => {},
)
export const DragStateContext = React.createContext<DragState>(defaultState)
export const useDragState = () => React.useContext(DragStateContext)
export const useDragDispatch = () => React.useContext(DragDispatchContext)

export const { dragStart, dragEnd, changeDirection } = drag.actions

export const DragContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(drag.reducer, defaultState)

  return (
    <DragDispatchContext.Provider value={dispatch}>
      <DragStateContext.Provider value={state}>
        {children}
      </DragStateContext.Provider>
    </DragDispatchContext.Provider>
  )
}
