import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        id_user: null,
        // token: null
    },
    reducers: {
        setIdUser: (state, actions) => {
            state.id_user = actions.payload
        }
    }
})

export const { setIdUser } = userSlice.actions

export default userSlice.reducer