import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type Settings = {
  animation: boolean
}

const defaultSettings: Settings = {
  animation: true,
}

export const settings = createSlice({
  name: 'settings',
  initialState: defaultSettings,
  reducers: {
    set: {
      prepare: <S extends keyof Settings>(name: S, value: Settings[S]) => {
        return { payload: { name, value } }
      },
      reducer: <S extends keyof Settings>(
        state: Settings,
        { payload }: PayloadAction<{ name: S; value: Settings[S] }>,
      ) => {
        state[payload.name] = payload.value
      },
    },
  },
})

export default settings
