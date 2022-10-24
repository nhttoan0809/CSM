import { Typography } from "@mui/material";
import { useDispatch } from 'react-redux'
import React, { useEffect } from "react";
import { setCurrentTab } from '../../redux/tabs'
import { setAgentList } from "../../redux/agent";

const AgentPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    fetch("http://localhost:5000/test_data/getAllAgent")
      .then((response) => response.json())
      .then((data) => {
        const status = data.status
        if(status==="Successfully"){
          const agentList = data.data
          dispatch(setAgentList(agentList))
        }
      })
  }, []);
  
  useEffect(() => {
    dispatch(setCurrentTab("agent"));
  }, [])

  return (
    <>
      {/* Title */}
      <Typography variant="h3">Đại lý</Typography>
      {/* <BasicTabs tabsList={tabsList}/> */}
    </>
  );
};

export default AgentPage;
