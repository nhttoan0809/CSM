import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { setCurrentTab } from "../../redux/tabs";
import { setCompany, setInfor } from "../../redux/user";
import Account from "./../../components/Account";
import * as api from "./../../api";

const CompanyPage = () => {
  const infor = useSelector((state) => state.user.infor);
  const company = useSelector((state) => state.user.company);

  const dispatch = useDispatch();
  useEffect(() => {
    api.authAPI.getInfor().then((data) => {
      if (data.status === "Successfully") {
        dispatch(setInfor(data.data));
      } else {
        dispatch(setInfor(null));
      }
    });
    api.companyAPI.getInfor().then((data) => {
      if (data.status === "Successfully") {
        dispatch(setCompany(data.data));
      } else {
        dispatch(setCompany(data.data));
      }
    });
  }, []);

  useEffect(() => {
    dispatch(setCurrentTab("company"));
  }, []);

  return (
    <>
      {/* Title */}
      {/* <Typography variant="h3">Tài khoản</Typography> */}
      {/* Profile */}
      {infor && company && (
        <>
          <Box
            sx={{
              marginBottom: "1.5rem",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box>
              <Account
                name={infor.name}
                sx={{ fontSize: "4rem", width: "8rem", height: "8rem" }}
              />
            </Box>
            <Box
              sx={{
                marginLeft: "1rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <Typography variant="h4">{infor.name}</Typography>
              <Typography sx={{ marginTop: "0.5rem" }}>
                username: {infor.username}
              </Typography>
              <Typography>email: {infor.email}</Typography>
            </Box>
          </Box>
          <Typography variant="h3">Công ty</Typography>
          {/* Company */}
          <Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                marginTop: "1rem",
              }}
            >
              <Typography variant="h5" sx={{ minWidth: "10rem" }}>
                Tên công ty:{" "}
              </Typography>
              <Typography sx={{ fontSize: "1.5rem", textAlign: "left" }}>
                {company.company_name}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                marginTop: "1rem",
              }}
            >
              <Typography variant="h5" sx={{ minWidth: "10rem" }}>
                Địa chỉ:{" "}
              </Typography>
              <Typography sx={{ fontSize: "1.5rem", textAlign: "left" }}>
                {company.company_address}
              </Typography>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default CompanyPage;
