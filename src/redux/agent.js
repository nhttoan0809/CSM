import { createSlice } from "@reduxjs/toolkit";

export const agentSlice = createSlice({
    name: 'agent',
    initialState: {
        currentAgent: -1,
        agentList: [
            {
                id: 'agent1id',
                name: 'Đại lý 1',
            },
            {
                id: 'agent2id',
                name: 'Đại lý 2'
            },
            {
                id: -1,
                name: 'None'
            }
        ]
    },
    reducers: {
        setCurrentAgent: (state, actions) => {
            console.log("Handle dispath: setCurrentAgent")
            return {
                ...state,
                currentAgent: actions.payload
            }
        },

        setAgentList: (state, actions) => {
            console.log("Handle dispath: setAgentList")
            return {
                ...state,
                agentList: actions.payload
            }
        }
    }
})

export const { setCurrentAgent, setAgentList } = agentSlice.actions

export default agentSlice.reducer