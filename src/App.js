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
import RegisterPage from "./pages/RegisterPage";
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

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
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
