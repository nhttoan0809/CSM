import { Typography } from "@mui/material";
import { useDispatch } from 'react-redux'
import React, { useEffect } from "react";
import { setCurrentTab } from '../../redux/tabs'

const CompanyPage = () => {
  const distpatch = useDispatch()
  useEffect(() => {
    fetch("http://localhost:5000/test_data/getInformation")
      .then((response) => response.json())
      .then((data) => console.log("data: ", data));
  }, []);
  
  useEffect(() => {
    distpatch(setCurrentTab("company"));
  }, [])

  return (
    <>
      {/* Title */}
      <Typography variant="h3">Công ty</Typography>
      {/* <BasicTabs tabsList={tabsList}/> */}
    </>
  );
};

export default CompanyPage;
