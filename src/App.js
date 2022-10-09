import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import "./layout/Header";

// Pages
import IndexRoute from "./pages/IndexRoute";
import AgentPage from "./pages/agent";
import CompanyPage from "./pages/company";
import GoodsPage from "./pages/goods";
import GoodsConfigurationPage from "./pages/goods/ConfigurationPage";
import GoodsDetailPage from "./pages/goods/DetailPage";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import PalletPage from "./pages/pallet";
import PalletConfigurationPage from "./pages/pallet/ConfigurationPage";
import PalletDetailPage from "./pages/pallet/DetailPage";
import SensorPage from "./pages/sensor";
import SensorConfigurationPage from "./pages/sensor/ConfigurationPage";
import SensorDetailPage from "./pages/sensor/DetailPage";
import WarehousePage from "./pages/warehouse";
import WarehouseConfigurationPage from "./pages/warehouse/ConfigurationPage";
import WarehouseDetailPage from "./pages/warehouse/DetailPage";
import WarehouseMonitorPage from "./pages/warehouse/MonitorPage";
import { setIdUser, setToken } from "./redux/user";
import { setAgentList } from "./redux/agent";

function App() {
  const token = useSelector(state => state.user.token);
  const id_user = useSelector(state => state.user.id_user);
  const navigate = useNavigate();
  const distpatch = useDispatch();

  useEffect(() => {
    if (token === null) {
      navigate("/login");
    }else{
      if(id_user===null){
        fetch('http://localhost:5000/test_data/reLogin')
          .then(response => response.json())
          .then(data => {
            const status = data.status
            if(status==="Successfully"){
              const id = data.data.user_id
              distpatch(setIdUser(id))
              fetch('http://localhost:5000/test_data/getAllAgent')
                .then(response => response.json())
                .then(data => {
                  const status = data.status
                  if(status==="Successfully"){
                    const agentList = data.data
                    distpatch(setAgentList(agentList))
                  }
                })
            }else{
              distpatch(setToken(null));
              navigate("/login");
            }
          })
      }
    }
  }, [token]);

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Home />}>
          <Route index element={<IndexRoute />} />
          <Route path="warehouse" element={<WarehousePage />}>
            <Route path="detail" element={<WarehouseDetailPage />} />
            <Route path="config" element={<WarehouseConfigurationPage />} />
            <Route path="monitor" element={<WarehouseMonitorPage />} />
          </Route>
          <Route path="pallet" element={<PalletPage />}>
            <Route path="detail" element={<PalletDetailPage />} />
            <Route path="config" element={<PalletConfigurationPage />} />
          </Route>
          <Route path="goods" element={<GoodsPage />}>
            <Route path="detail" element={<GoodsDetailPage />} />
            <Route path="config" element={<GoodsConfigurationPage />} />
          </Route>
          <Route path="sensor" element={<SensorPage />}>
            <Route path="detail" element={<SensorDetailPage />} />
            <Route path="config" element={<SensorConfigurationPage />} />
          </Route>
          <Route path="company" element={<CompanyPage />} />
          <Route path="agent" element={<AgentPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
