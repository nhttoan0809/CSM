import { createSlice } from "@reduxjs/toolkit";

export const agentSlice = createSlice({
    name: 'agent',
    initialState: {
        currentAgent: -1,
        agentList: [
            // {
            //     agent_id: 'agent1id',
            //     agent_name: 'Đại lý 1',
            //     agent_owner: 'ABC'
            // },
            // {
            //     agent_id: 'agent2id',
            //     agent_name: 'Đại lý 2',
            //     agent_owner: 'xyz'
            // },
            // {
            //     agent_id: 'agent3id',
            //     agent_name: 'Đại lý 3',
            //     agent_owner: 'DEF'
            // },
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