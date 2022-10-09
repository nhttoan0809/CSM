import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Layout from "../layout/Layout";

const Home = () => {

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default Home;
