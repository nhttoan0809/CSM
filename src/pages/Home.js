import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import Layout from "../layout/Layout";
import { setAgentList, setCurrentAgent } from "../redux/agent";
import { setIdUser, setToken } from "../redux/user";
import { setWarehouseList } from "../redux/warehouse";
import * as api from './../api';

const Home = () => {

  const token = useSelector(state => state.user.token);
  const id_user = useSelector(state => state.user.id_user);
  const distpatch = useDispatch();

  if (token === null) {
    return <Navigate to="/login" replace={true} />
  } else {
    if (id_user === null) {
      const res = api.authAPI.reLogin()
      res.then(data => {
        if (data.status === "Successfully") {
          distpatch(setIdUser(data.data.user_id))
        } else {
          distpatch(setToken(null));
          return <Navigate to="/login" replace={true} />
        }
      })
    }
    const res = api.agentAPI.get_all()
    res.then(data => {
      if (data.status === "Successfully") {
        const agentList = data.data
        distpatch(setAgentList(agentList))
        if (agentList.length > 0) {
          distpatch(setCurrentAgent(agentList[0]._id))
          const id_agent = agentList[0]._id
          const res = api.warehouseAPI.get_all(id_agent)
          res.then(data => {
            if (data.status === "Successfully") {
              distpatch(setWarehouseList(data.data))
            }
          })
        }
      }
    })
  }

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default Home;
