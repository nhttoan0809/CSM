import { Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import ConfigurationComponent from './components/Configuration.component';
import DetailComponent from './components/Detail.component';
import MonitorComponent from './components/Monitor.component';
import './layout/Header';
import Layout from './layout/Layout';

// Pages
import WarehousePage from './pages/warehouse';
import WarehouseDetailPage from './pages/warehouse/DetailPage';
import WarehouseConfigurationPage from './pages/warehouse/ConfigurationPage';
import WarehouseMonitorPage from './pages/warehouse/MonitorPage';
import PalletPage from './pages/pallet';
import PalletDetailPage from './pages/pallet/DetailPage';
import PalletConfigurationPage from './pages/pallet/ConfigurationPage';
import GoodsPage from './pages/goods';
import GoodsDetailPage from './pages/goods/DetailPage';
import GoodsConfigurationPage from './pages/goods/ConfigurationPage';
import SensorPage from './pages/sensor';
import SensorDetailPage from './pages/sensor/DetailPage';
import SensorConfigurationPage from './pages/sensor/ConfigurationPage';
import CompanyPage from './pages/company';
import AgentPage from './pages/agent';

function App() {
  // const tabsList = [
  //   {
  //     title: 'Chi tiet',
  //     url: 'https://jsonplaceholder.typicode.com/posts',
  //     generateComponent: (data) => (
  //       <DetailComponent data={data}/>
  //     )
  //   },
  //   {
  //     title: 'Cau hinh',
  //     url: 'https://jsonplaceholder.typicode.com/albums',
  //     generateComponent: (data) => (
  //       <ConfigurationComponent data={data}/>
  //     )
  //   },
  //   {
  //     title: 'Giam sat',
  //     url: 'https://jsonplaceholder.typicode.com/todos',
  //     generateComponent: (data) => (
  //       <MonitorComponent data={data}/>
  //     )
  //   }
  // ]

  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path='/' element={<><Outlet /></>}>
            <Route path='warehouse' element={<WarehousePage />}>
              {/* <Route index action={useNavigate()('warehouse/detail')}/> */}
              <Route path='detail' element={<WarehouseDetailPage />} />
              <Route path='config' element={<WarehouseConfigurationPage />} />
              <Route path='monitor' element={<WarehouseMonitorPage />} />
            </Route>
            <Route path='pallet' element={<PalletPage />}>
              <Route path='detail' element={<PalletDetailPage />} />
              <Route path='config' element={<PalletConfigurationPage />} />
            </Route>
            <Route path='goods' element={<GoodsPage />}>
              <Route path='detail' element={<GoodsDetailPage />} />
              <Route path='config' element={<GoodsConfigurationPage />} />
            </Route>
            <Route path='sensor' element={<SensorPage />}>
              <Route path='detail' element={<SensorDetailPage />} />
              <Route path='config' element={<SensorConfigurationPage />} />
            </Route>
            <Route path='company' element={<CompanyPage />} />
            <Route path='agent' element={<AgentPage />} />
          </Route>
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
