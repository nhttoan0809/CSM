import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Layout from "../layout/Layout";
import { setAgentList, setCurrentAgent } from "../redux/agent";
import { setCompany, setIdUser, setInfor, setToken } from "../redux/user";
import { setWarehouseList } from "../redux/warehouse";
import * as api from "./../api";

const Home = () => {
  const token = useSelector((state) => state.user.token);
  const id_user = useSelector((state) => state.user.id_user);
  const dispatch = useDispatch();

  if (token === null) {
    return <Navigate to="/login" replace={true} />;
  } else {
    if (id_user === null) {
      const res = api.authAPI.reLogin();
      res.then(async (data) => {
        if (data.status === "Successfully") {
          dispatch(setIdUser(data.data.id_user));
          await api.authAPI.getInfor().then((data) => {
            if (data.status === "Successfully") {
              dispatch(setInfor(data.data));
            } else {
              dispatch(setInfor(null));
            }
          });
          api.companyAPI.getInfor().then((data) => {
            console.log("company: ", data);
            if (data.status === "Successfully") {
              dispatch(setCompany(data.data));
            } else {
              dispatch(setCompany(null));
            }
          });
        } else {
          dispatch(setToken(null));
          return <Navigate to="/login" replace={true} />;
        }
      });
    }
    const res = api.agentAPI.get_all();
    res.then((data) => {
      if (data.status === "Successfully") {
        const agentList = data.data;
        dispatch(setAgentList(agentList));
        if (agentList.length > 0) {
          dispatch(setCurrentAgent(agentList[0]._id));
          const id_agent = agentList[0]._id;
          const res = api.warehouseAPI.get_all(id_agent);
          res.then((data) => {
            if (data.status === "Successfully") {
              dispatch(setWarehouseList(data.data));
            }
          });
        } else {
          return <Navigate to="/agent" replace={true} />;
        }
      }
    });
  }

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default Home;
