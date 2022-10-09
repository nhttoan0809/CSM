import { Typography } from "@mui/material";
import { useDispatch } from 'react-redux'
import React, { useEffect } from "react";
import { setCurrentTab } from '../../redux/tabs'

const AgentPage = () => {
  const distpatch = useDispatch()
  useEffect(() => {
    fetch("http://localhost:5000/test_data/getAllAgent")
      .then((response) => response.json())
      .then((data) => console.log("data: ", data));
  }, []);
  
  useEffect(() => {
    distpatch(setCurrentTab("agent"));
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
